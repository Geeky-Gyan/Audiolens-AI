"use client";

import React from "react";
import { RecordItem, ViewTab } from "@/types";

interface ResultsViewProps {
  activeRecord: RecordItem;
  viewTab: ViewTab;
  setViewTab: (tab: ViewTab) => void;
  copiedType: "transcript" | "summary" | null;
  copyToClipboard: (text: string, type: "transcript" | "summary") => void;
  downloadTextFile: (content: string, filename: string) => void;
  transcriptSearch: string;
  setTranscriptSearch: (search: string) => void;
  transcriptMatchCount: number;
  transcriptWordCount: number;
  summaryWordCount: number;
}

export const renderFormattedSummary = (rawText?: string | null): React.ReactNode => {
  if (!rawText) return null;

  const lines = rawText.split("\n");
  return (
    <div className="space-y-3.5 font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        if (trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#")) {
          const cleanHeader = trimmed.replace(/^#+\s*/, "");
          return (
            <h4
              key={idx}
              className="text-base md:text-lg font-bold text-white pt-2 flex items-center gap-2.5 border-b border-indigo-500/25 pb-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              {cleanHeader}
            </h4>
          );
        }

        if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 text-slate-100 text-sm md:text-[15px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0 shadow-sm shadow-violet-400/50" />
              <span>{content}</span>
            </div>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          const numberMatch = trimmed.match(/^(\d+)\.\s*(.*)$/);
          if (numberMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1 text-slate-100 text-sm md:text-[15px] leading-relaxed">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/25 text-indigo-300 border border-indigo-500/35 shrink-0 mt-0.5">
                  {numberMatch[1]}
                </span>
                <span>{numberMatch[2]}</span>
              </div>
            );
          }
        }

        return (
          <p key={idx} className="text-slate-200 text-sm md:text-[15px] leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

export default function ResultsView({
  activeRecord,
  viewTab,
  setViewTab,
  copiedType,
  copyToClipboard,
  downloadTextFile,
  transcriptSearch,
  setTranscriptSearch,
  transcriptMatchCount,
  transcriptWordCount,
  summaryWordCount,
}: ResultsViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewTab("split")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              viewTab === "split"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Side-by-Side View
          </button>

          <button
            onClick={() => setViewTab("summary")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              viewTab === "summary"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            Executive Summary
          </button>

          <button
            onClick={() => setViewTab("transcript")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              viewTab === "transcript"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Full Transcript
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {activeRecord.summary_text && (
            <button
              onClick={() =>
                downloadTextFile(
                  activeRecord.summary_text!,
                  `${activeRecord.filename || "audio"}_summary.txt`
                )
              }
              title="Download summary as text file"
              className="text-xs md:text-sm px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition flex items-center gap-2 font-bold cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Summary (.txt)
            </button>
          )}
          {activeRecord.transcript_text && (
            <button
              onClick={() =>
                downloadTextFile(
                  activeRecord.transcript_text!,
                  `${activeRecord.filename || "audio"}_transcript.txt`
                )
              }
              title="Download full transcript as text file"
              className="text-xs md:text-sm px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition flex items-center gap-2 font-bold cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Transcript (.txt)
            </button>
          )}
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          viewTab === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {(viewTab === "split" || viewTab === "summary") && (
          <div className="glass-panel border border-violet-500/30 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 bg-gradient-to-b from-[#10142b]/80 to-[#0a0e1c]/80 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-md shadow-violet-400/50 shrink-0" />
                <h3 className="text-base md:text-xl font-bold text-white whitespace-nowrap">
                  Executive Summary
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 font-bold shrink-0">
                  LLaMA 3.3
                </span>
              </div>

              {activeRecord.summary_text && (
                <button
                  onClick={() => copyToClipboard(activeRecord.summary_text!, "summary")}
                  className="text-xs md:text-sm px-4 py-2 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 text-violet-200 border border-violet-500/30 transition flex items-center gap-2 cursor-pointer font-bold shrink-0 ml-auto"
                >
                  {copiedType === "summary" ? (
                    <>
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-[#06080f]/80 border border-white/[0.08] rounded-2xl p-6 min-h-[22rem] max-h-[42rem] overflow-y-auto">
              {activeRecord.summary_text ? (
                renderFormattedSummary(activeRecord.summary_text)
              ) : (
                <div className="text-slate-400 italic py-12 text-center text-sm">
                  Generating executive summary with LLaMA 3.3...
                </div>
              )}
            </div>

            {activeRecord.summary_text && (
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-300 pt-1 font-medium">
                <span>Executive brief extracted from transcription</span>
                <span className="font-mono text-indigo-300 font-bold">{summaryWordCount} words</span>
              </div>
            )}
          </div>
        )}

        {(viewTab === "split" || viewTab === "transcript") && (
          <div className="glass-panel border border-emerald-500/25 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 bg-gradient-to-b from-[#0c1626]/80 to-[#070c18]/80 min-w-0">
            <div className="flex flex-col gap-3.5 border-b border-white/[0.08] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2.5 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 shrink-0" />
                  <h3 className="text-base md:text-xl font-bold text-white whitespace-nowrap">Full Transcript</h3>
                  {activeRecord.transcript_text && (
                    <span className="text-xs md:text-sm px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono font-bold shrink-0">
                      {transcriptWordCount} words
                    </span>
                  )}
                </div>

                {activeRecord.transcript_text && (
                  <button
                    onClick={() => copyToClipboard(activeRecord.transcript_text!, "transcript")}
                    className="text-xs md:text-sm px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition flex items-center gap-2 cursor-pointer font-bold shrink-0 ml-auto"
                  >
                    {copiedType === "transcript" ? (
                      <>
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search inside transcript text..."
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                  className="w-full text-sm bg-[#06080f] border border-white/10 rounded-xl pl-10 pr-24 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {transcriptSearch && (
                  <div className="absolute right-2.5 top-2 flex items-center gap-1.5">
                    <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {transcriptMatchCount} match{transcriptMatchCount === 1 ? "" : "es"}
                    </span>
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="text-slate-400 hover:text-slate-200 text-xs px-1 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#06080f]/80 border border-white/[0.08] rounded-2xl p-6 min-h-[22rem] max-h-[42rem] overflow-y-auto font-sans leading-relaxed text-slate-100 text-sm md:text-[15px]">
              {activeRecord.transcript_text ? (
                transcriptSearch.trim() ? (
                  activeRecord.transcript_text
                    .split(new RegExp(`(${transcriptSearch})`, "gi"))
                    .map((part, i) =>
                      part.toLowerCase() === transcriptSearch.toLowerCase() ? (
                        <mark
                          key={i}
                          className="bg-amber-400/35 text-amber-200 px-1.5 py-0.5 rounded font-medium shadow-sm"
                        >
                          {part}
                        </mark>
                      ) : (
                        part
                      )
                    )
                ) : (
                  activeRecord.transcript_text
                )
              ) : (
                <div className="text-slate-400 italic py-12 text-center text-base">
                  Transcribing audio with Gnani ASR...
                </div>
              )}
            </div>

            {activeRecord.transcript_text && (
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-300 pt-1 font-medium">
                <span>Raw ASR transcript generated by Gnani Prisma</span>
                <span className="font-mono text-emerald-400 font-bold">
                  ~{Math.ceil(transcriptWordCount / 150)} min read
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
