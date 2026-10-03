"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { RecordItem, ViewTab, HistoryFilter } from "@/types";
import {
  formatDate,
  formatTime,
  formatFileSize,
  getStatusDescription,
  getProgressPercentage,
  getHumanReadableErrorMessage,
  downloadTextFile,
} from "@/utils/formatters";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UploadZone from "@/components/UploadZone";
import ActiveRecordHeader from "@/components/ActiveRecordHeader";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import ResultsView from "@/components/ResultsView";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileAudioPreviewUrl, setFileAudioPreviewUrl] = useState<string | null>(null);
  const [activeRecord, setActiveRecord] = useState<RecordItem | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const [pastRecords, setPastRecords] = useState<RecordItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [historySearch, setHistorySearch] = useState<string>("");
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");
  const [sidebarWidth, setSidebarWidth] = useState<number>(380);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [viewTab, setViewTab] = useState<ViewTab>("split");

  const [copiedType, setCopiedType] = useState<"transcript" | "summary" | null>(null);
  const [transcriptSearch, setTranscriptSearch] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isResizingRef = useRef<boolean>(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileAudioPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileAudioPreviewUrl(null);
    }
  }, [file]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const isWorking =
      isUploading ||
      (activeRecord &&
        activeRecord.status !== "completed" &&
        !activeRecord.status.includes("failed"));

    if (isWorking) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeRecord?.status, isUploading]);

  const fetchPastRecords = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`${API_BASE}/api/records`);
      if (res.ok) {
        const data = await res.json();
        setPastRecords(data);
      }
    } catch (err) {
      console.error("Failed to load past uploads:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchPastRecords();
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = Math.max(320, Math.min(e.clientX, 800));
    setSidebarWidth(newWidth);
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const startPolling = (recordId: number) => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/status/${recordId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setStatus("failed: Record not found on server");
            setIsUploading(false);
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          }
          return;
        }
        const data: RecordItem = await res.json();

        setStatus(data.status);
        setActiveRecord(data);

        if (data.status === "completed" || data.status.includes("failed")) {
          setIsUploading(false);
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          fetchPastRecords();
        }
      } catch (err) {
        console.error("Polling network error:", err);
      }
    }, 3000);
  };

  const handleUpload = async () => {
    if (!file) return;

    if (file.size === 0) {
      setUploadError("The selected audio file is empty (0 bytes). Please choose a valid audio recording.");
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setStatus("sending_to_server");
    setElapsedSeconds(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let msg = `Server responded with HTTP ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson?.detail) msg = errJson.detail;
          else if (errJson?.message) msg = errJson.message;
        } catch {
          const errText = await response.text().catch(() => "");
          if (errText && !errText.includes("<!DOCTYPE") && errText.length < 200) {
            msg = errText;
          } else if (response.status === 500 || response.status === 502) {
            msg = "Backend server is not responding on port 8000. Please ensure FastAPI is running.";
          }
        }
        throw new Error(msg);
      }

      const data = await response.json();
      if (data.record_id) {
        setActiveRecord({
          id: data.record_id,
          filename: file.name,
          status: "received",
        });
        startPolling(data.record_id);
      }
    } catch (error) {
      setStatus("upload_failed");
      setIsUploading(false);
      setUploadError(
        error instanceof Error
          ? `Upload failed: ${error.message}`
          : "Network error: Unable to contact the backend server. Is FastAPI running on port 8000?"
      );
      console.error(error);
    }
  };

  const handleSelectRecord = async (record: RecordItem) => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    setIsUploading(false);
    setStatus(record.status);
    setActiveRecord(record);
    setTranscriptSearch("");
    setUploadError(null);

    if (record.status !== "completed" && !record.status.includes("failed")) {
      startPolling(record.id);
    }
  };

  const handleDeleteRecord = async (e: React.MouseEvent, recordId: number) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this recording?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/records/${recordId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPastRecords((prev) => prev.filter((r) => r.id !== recordId));
        if (activeRecord?.id === recordId) {
          handleNewUpload();
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleClearAllRecords = async () => {
    if (pastRecords.length === 0) return;
    if (!confirm("Are you sure you want to clear all upload history? This will delete all saved audio transcripts.")) return;

    try {
      const res = await fetch(`${API_BASE}/api/records`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPastRecords([]);
        handleNewUpload();
      }
    } catch (err) {
      console.error("Clear all failed:", err);
    }
  };

  const handleNewUpload = () => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    setFile(null);
    setStatus("");
    setActiveRecord(null);
    setIsUploading(false);
    setUploadError(null);
    setElapsedSeconds(0);
    setTranscriptSearch("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadError(null);
    }
  };

  const copyToClipboard = (text: string, type: "transcript" | "summary") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  const filteredRecords = useMemo(() => {
    let list = pastRecords;
    if (historyFilter === "completed") {
      list = list.filter((r) => r.status === "completed");
    } else if (historyFilter === "processing") {
      list = list.filter((r) => r.status !== "completed" && !r.status.includes("failed"));
    }

    if (!historySearch.trim()) return list;
    return list.filter((r) =>
      (r.filename || `Record #${r.id}`).toLowerCase().includes(historySearch.toLowerCase())
    );
  }, [pastRecords, historySearch, historyFilter]);

  const getStepStatus = (step: number): "active" | "done" | "error" | "pending" => {
    if (status === "completed") return "done";
    if (status.includes("failed")) return "error";

    if (step === 1) {
      if (["sending_to_server", "received"].includes(status)) return "active";
      if (status !== "") return "done";
    }
    if (step === 2) {
      if (["uploading_to_gnani", "processing_audio"].includes(status)) return "active";
      if (["summarizing", "completed"].includes(status)) return "done";
    }
    if (step === 3) {
      if (status === "summarizing") return "active";
      if (status === "completed") return "done";
    }
    return "pending";
  };

  const transcriptMatchCount = useMemo(() => {
    if (!transcriptSearch.trim() || !activeRecord?.transcript_text) return 0;
    try {
      const matches = activeRecord.transcript_text.match(new RegExp(transcriptSearch, "gi"));
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [transcriptSearch, activeRecord?.transcript_text]);

  const transcriptWordCount = useMemo(() => {
    if (!activeRecord?.transcript_text) return 0;
    return activeRecord.transcript_text.trim().split(/\s+/).filter(Boolean).length;
  }, [activeRecord?.transcript_text]);

  const summaryWordCount = useMemo(() => {
    if (!activeRecord?.summary_text) return 0;
    return activeRecord.summary_text.trim().split(/\s+/).filter(Boolean).length;
  }, [activeRecord?.summary_text]);

  return (
    <div
      className={`min-h-screen bg-[#06080f] text-slate-100 flex flex-col font-sans ambient-mesh ${
        isResizing ? "select-none cursor-col-resize" : ""
      }`}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[34rem] h-[34rem] bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[38rem] h-[38rem] bg-cyan-600/12 rounded-full blur-3xl" />
      </div>

      <Navbar onNewUpload={handleNewUpload} />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        <Sidebar
          sidebarWidth={sidebarWidth}
          startResizing={startResizing}
          pastRecords={pastRecords}
          filteredRecords={filteredRecords}
          activeRecord={activeRecord}
          isLoadingHistory={isLoadingHistory}
          historySearch={historySearch}
          setHistorySearch={setHistorySearch}
          historyFilter={historyFilter}
          setHistoryFilter={setHistoryFilter}
          onSelectRecord={handleSelectRecord}
          onDeleteRecord={handleDeleteRecord}
          onClearAllRecords={handleClearAllRecords}
          onRefreshRecords={fetchPastRecords}
          isMounted={isMounted}
          formatDate={formatDate}
        />

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 flex flex-col items-center">
          <div className="w-full max-w-[1400px] flex flex-col gap-6">
            {!activeRecord && (
              <UploadZone
                file={file}
                setFile={setFile}
                fileAudioPreviewUrl={fileAudioPreviewUrl}
                isUploading={isUploading}
                isDragging={isDragging}
                uploadError={uploadError}
                setUploadError={setUploadError}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleUpload={handleUpload}
                isMounted={isMounted}
                fileInputRef={fileInputRef}
                formatFileSize={formatFileSize}
              />
            )}

            {activeRecord && (
              <div className="flex flex-col gap-6">
                <ActiveRecordHeader
                  activeRecord={activeRecord}
                  onNewUpload={handleNewUpload}
                  apiBase={API_BASE}
                  formatDate={formatDate}
                />

                {activeRecord.status !== "completed" && (
                  <ProcessingPipeline
                    activeRecord={activeRecord}
                    elapsedSeconds={elapsedSeconds}
                    getStatusDescription={getStatusDescription}
                    getProgressPercentage={getProgressPercentage}
                    getStepStatus={getStepStatus}
                    getHumanReadableErrorMessage={getHumanReadableErrorMessage}
                    formatTime={formatTime}
                    onNewUpload={handleNewUpload}
                    onRetry={() => {
                      if (file) handleUpload();
                      else handleNewUpload();
                    }}
                  />
                )}

                {(activeRecord.transcript_text || activeRecord.summary_text) && (
                  <ResultsView
                    activeRecord={activeRecord}
                    viewTab={viewTab}
                    setViewTab={setViewTab}
                    copiedType={copiedType}
                    copyToClipboard={copyToClipboard}
                    downloadTextFile={downloadTextFile}
                    transcriptSearch={transcriptSearch}
                    setTranscriptSearch={setTranscriptSearch}
                    transcriptMatchCount={transcriptMatchCount}
                    transcriptWordCount={transcriptWordCount}
                    summaryWordCount={summaryWordCount}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}