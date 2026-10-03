"use client";

import React, { useState } from "react";
import { RecordItem, HistoryFilter } from "@/types";

interface SidebarProps {
  sidebarWidth: number;
  startResizing: (e: React.MouseEvent) => void;
  pastRecords: RecordItem[];
  filteredRecords: RecordItem[];
  activeRecord: RecordItem | null;
  isLoadingHistory: boolean;
  historySearch: string;
  setHistorySearch: (search: string) => void;
  historyFilter: HistoryFilter;
  setHistoryFilter: (filter: HistoryFilter) => void;
  onSelectRecord: (record: RecordItem) => void;
  onDeleteRecord: (e: React.MouseEvent, recordId: number) => void;
  onClearAllRecords: () => void;
  onRefreshRecords: () => void;
  isMounted: boolean;
  formatDate: (isoString?: string | null) => string;
}

export default function Sidebar({
  sidebarWidth,
  startResizing,
  pastRecords,
  filteredRecords,
  activeRecord,
  isLoadingHistory,
  historySearch,
  setHistorySearch,
  historyFilter,
  setHistoryFilter,
  onSelectRecord,
  onDeleteRecord,
  onClearAllRecords,
  onRefreshRecords,
  isMounted,
  formatDate,
}: SidebarProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState<boolean>(false);

  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className="sidebar-responsive w-full relative border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#090d19]/85 backdrop-blur-xl flex flex-col shrink-0"
    >
      <div className="p-3 sm:p-4 border-b border-white/[0.08] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileExpanded((prev) => !prev)}
            className="flex items-center gap-2.5 text-left md:pointer-events-none cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Past Recordings</span>
            <span
              suppressHydrationWarning
              className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 font-bold font-mono"
            >
              {isMounted ? pastRecords.length : 0}
            </span>
            <span className="md:hidden text-xs text-indigo-400 font-semibold ml-1">
              {isMobileExpanded ? "▲ Hide" : "▼ Show"}
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              suppressHydrationWarning
              onClick={onClearAllRecords}
              disabled={!isMounted || pastRecords.length === 0}
              title="Clear all past recordings"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/5 hover:border-rose-500/30 transition flex items-center gap-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear</span>
            </button>

            <button
              onClick={onRefreshRecords}
              title="Refresh recording list"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <svg className={`w-4 h-4 ${isLoadingHistory ? "animate-spin text-indigo-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${isMobileExpanded ? "flex" : "hidden md:flex"} flex-col gap-2.5 pt-1`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search recordings..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              className="w-full bg-[#06080f]/80 border border-white/10 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {historySearch && (
              <button
                onClick={() => setHistorySearch("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5 w-full">
            {(["all", "completed", "processing"] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setHistoryFilter(filterKey)}
                className={`text-xs font-semibold py-1.5 px-2 rounded-lg transition-all capitalize cursor-pointer text-center w-full flex items-center justify-center ${
                  historyFilter === filterKey
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${isMobileExpanded ? "flex" : "hidden md:flex"} flex-1 overflow-y-auto p-3 sm:p-4 flex-col gap-2.5 max-h-[22rem] md:max-h-none`}>
        {isLoadingHistory && pastRecords.length === 0 ? (
          <div className="p-6 text-center text-xs sm:text-sm text-slate-300 space-y-2">
            <svg className="w-5 h-5 animate-spin mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="font-medium">Loading database history...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-6 text-center text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <p className="font-medium">No recordings found</p>
            <p className="text-[11px] text-slate-400">Upload an audio recording to populate history</p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isSelected = activeRecord?.id === record.id;
            const isCompleted = record.status === "completed";
            const isFailed = record.status.includes("failed");

            return (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500/60 shadow-md shadow-indigo-600/10"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 shrink-0">
                      #{record.id}
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-white truncate" title={record.filename || ""}>
                      {record.filename || `Recording #${record.id}`}
                    </span>
                  </div>

                  <button
                    onClick={(e) => onDeleteRecord(e, record.id)}
                    title="Delete record"
                    className="text-slate-400 hover:text-rose-400 p-1 rounded-md hover:bg-rose-500/10 transition shrink-0 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 border-t border-white/5">
                  <span className="flex items-center gap-1 font-mono font-medium" suppressHydrationWarning>
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(record.created_at)}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : isFailed
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 animate-pulse"
                    }`}
                  >
                    {isCompleted ? "Completed" : isFailed ? "Error" : "Processing"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div
        onMouseDown={startResizing}
        title="Drag to resize sidebar width"
        className="hidden md:block absolute right-0 top-0 bottom-0 w-3 cursor-col-resize hover:bg-indigo-500/50 active:bg-indigo-600 transition-colors z-30 group"
      >
        <div className="w-1 h-8 bg-white/20 group-hover:bg-indigo-400 rounded-full mx-auto my-auto top-1/2 -translate-y-1/2 relative transition-colors" />
      </div>
    </aside>
  );
}
