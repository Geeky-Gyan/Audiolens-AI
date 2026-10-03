"use client";

import React from "react";

interface UploadZoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  fileAudioPreviewUrl: string | null;
  isUploading: boolean;
  isDragging: boolean;
  uploadError: string | null;
  setUploadError: (err: string | null) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  handleUpload: () => void;
  isMounted: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  formatFileSize: (bytes: number) => string;
}

export default function UploadZone({
  file,
  setFile,
  fileAudioPreviewUrl,
  isUploading,
  isDragging,
  uploadError,
  setUploadError,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleUpload,
  isMounted,
  fileInputRef,
  formatFileSize,
}: UploadZoneProps) {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 max-w-2xl mx-auto w-full py-2 sm:py-4">
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold tracking-wide uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Gnani Prisma ASR • Meta LLaMA via Groq
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
          Turn Spoken Audio into{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Structured Insights
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Upload any speech recording or interview. Our background pipeline transcribes with high accuracy and generates concise AI summaries.
        </p>
      </div>

      {uploadError && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start justify-between gap-3 text-xs text-rose-200 shadow-md">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <strong className="block text-rose-300 font-semibold text-xs">Upload Error</strong>
              <p className="text-rose-200/90 leading-relaxed pt-0.5">{uploadError}</p>
            </div>
          </div>
          <button
            onClick={() => setUploadError(null)}
            className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-rose-500/20 transition cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center gap-3.5 text-center cursor-pointer transition-all duration-200 border border-dashed ${
          isDragging
            ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
            : file
            ? "border-emerald-500/40 bg-[#0d1527]/80 shadow-md shadow-emerald-500/10"
            : "border-white/15 hover:border-indigo-500/40 bg-white/[0.02] hover:bg-white/[0.04]"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setUploadError(null);
            }
          }}
          className="hidden"
        />

        {file ? (
          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            <div className="flex items-end gap-1.5 h-8 px-5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
              <span className="w-1.5 bg-emerald-400 rounded-full wave-bar-1" />
              <span className="w-1.5 bg-emerald-300 rounded-full wave-bar-2" />
              <span className="w-1.5 bg-emerald-400 rounded-full wave-bar-3" />
              <span className="w-1.5 bg-cyan-400 rounded-full wave-bar-4" />
              <span className="w-1.5 bg-emerald-400 rounded-full wave-bar-5" />
            </div>

            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> {file.name}
              </p>
              <p className="text-xs text-slate-400">
                {formatFileSize(file.size)} • Ready for transcription
              </p>
            </div>

            {fileAudioPreviewUrl && (
              <div
                className="pt-1 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <audio
                  controls
                  src={fileAudioPreviewUrl}
                  className="w-full h-8 rounded-md opacity-90 shadow-sm"
                />
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-rose-400 hover:text-rose-300 underline pt-0.5 font-medium cursor-pointer"
            >
              Choose another file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-semibold text-white">
                Drop audio recording here, or{" "}
                <span className="text-indigo-400 group-hover:text-cyan-300 underline decoration-indigo-400/40 underline-offset-2">
                  browse
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Supports MP3, WAV, OGG, M4A, FLAC, AAC
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 pt-0.5">
              {["MP3", "WAV", "M4A", "FLAC", "OGG"].map((ext) => (
                <span
                  key={ext}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400"
                >
                  .{ext}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!isMounted || !file || isUploading}
        suppressHydrationWarning
        className="shimmer-effect w-full py-2.5 sm:py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Processing Audio &amp; Summary...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Transcribe &amp; Summarize</span>
          </>
        )}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Gnani Prisma Engine</h4>
            <p className="text-[11px] text-slate-400 leading-normal pt-0.5">
              High-accuracy speech-to-text with noise suppression.
            </p>
          </div>
        </div>

        <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Meta LLaMA Intelligence</h4>
            <p className="text-[11px] text-slate-400 leading-normal pt-0.5">
              Extracts key takeaways and structured executive briefs.
            </p>
          </div>
        </div>

        <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Zero Timeout Loop</h4>
            <p className="text-[11px] text-slate-400 leading-normal pt-0.5">
              Background workers handle audio without connection dropouts.
            </p>
          </div>
        </div>

        <div className="glass-card p-3 rounded-xl flex items-start gap-2.5 border border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Cloud History</h4>
            <p className="text-[11px] text-slate-400 leading-normal pt-0.5">
              Search transcripts, replay audio, and export summaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
