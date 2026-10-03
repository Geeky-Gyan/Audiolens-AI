"use client";

import { RecordItem } from "@/types";

interface ActiveRecordHeaderProps {
  activeRecord: RecordItem;
  onNewUpload: () => void;
  apiBase: string;
  formatDate: (isoString?: string | null) => string;
}

export default function ActiveRecordHeader({
  activeRecord,
  onNewUpload,
  apiBase,
  formatDate,
}: ActiveRecordHeaderProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col gap-4 border border-white/10 shadow-2xl w-full">
      <div className="flex items-start sm:items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg md:text-2xl font-black text-white truncate" title={activeRecord.filename || `Recording #${activeRecord.id}`}>
              {activeRecord.filename || `Recording #${activeRecord.id}`}
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm text-slate-300 mt-1 font-medium">
              <span className="font-mono text-indigo-300 font-bold">Record ID #{activeRecord.id}</span>
              <span>•</span>
              <span suppressHydrationWarning>{formatDate(activeRecord.created_at)}</span>
              <span>•</span>
              <span className="capitalize font-bold text-slate-200">
                {activeRecord.status === "completed" ? "Ready" : activeRecord.status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onNewUpload}
          className="text-xs md:text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          + New Audio
        </button>
      </div>

      {activeRecord.status === "completed" && (
        <div className="w-full bg-[#06080f]/80 border border-white/[0.08] rounded-xl p-3 flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <audio
            controls
            suppressHydrationWarning
            src={`${apiBase}/api/audio/${activeRecord.id}`}
            className="h-9 flex-1 min-w-0 max-w-full opacity-90 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
