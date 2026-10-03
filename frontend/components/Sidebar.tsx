"use client";

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
  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className="w-full relative border-r border-white/[0.08] bg-[#090d19]/85 backdrop-blur-xl flex flex-col shrink-0"
    >
      <div className="p-4 md:p-5 border-b border-white/[0.08] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight text-white">Past Recordings</span>
            <span
              suppressHydrationWarning
              className="text-xs md:text-sm px-3 py-0.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 font-black font-mono"
            >
              {isMounted ? pastRecords.length : 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              suppressHydrationWarning
              onClick={onClearAllRecords}
              disabled={!isMounted || pastRecords.length === 0}
              title="Clear all past recordings"
              className="text-xs md:text-sm px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/5 hover:border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed font-bold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>

            <button
              onClick={onRefreshRecords}
              title="Refresh recording list"
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition"
            >
              <svg className={`w-5 h-5 ${isLoadingHistory ? "animate-spin text-indigo-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search recordings by name..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full bg-[#06080f]/80 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-base text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
          />
          {historySearch && (
            <button
              onClick={() => setHistorySearch("")}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full pt-1">
          {(["all", "completed", "processing"] as const).map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setHistoryFilter(filterKey)}
              className={`text-xs md:text-sm font-bold py-2.5 px-2 rounded-xl transition-all capitalize cursor-pointer text-center w-full flex items-center justify-center ${
                historyFilter === filterKey
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {filterKey}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {isLoadingHistory && pastRecords.length === 0 ? (
          <div className="p-8 text-center text-base text-slate-300 space-y-2.5">
            <svg className="w-7 h-7 animate-spin mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="font-semibold">Loading database history...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-slate-300 space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <p className="text-base font-bold text-white">{historySearch ? "No matching records found." : "No recordings uploaded yet."}</p>
            <span className="text-sm text-slate-400">Audio will automatically save here</span>
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
                className={`group relative p-4.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col gap-3 ${
                  isSelected
                    ? "bg-indigo-600/20 border border-indigo-500/60 shadow-lg shadow-indigo-600/15 neon-border-active"
                    : "hover:bg-white/[0.06] border border-white/[0.06] bg-[#070b16]/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 overflow-hidden min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-indigo-500/25 text-indigo-300 border border-indigo-500/40"
                          : "bg-white/5 text-slate-300 group-hover:text-indigo-300"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <p className="text-base md:text-lg font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                      {record.filename || `Audio #${record.id}`}
                    </p>
                  </div>

                  <button
                    onClick={(e) => onDeleteRecord(e, record.id)}
                    title="Delete recording from database"
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm text-slate-300 pt-1 border-t border-white/[0.04]">
                  <span className="flex items-center gap-1.5 font-mono font-medium" suppressHydrationWarning>
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(record.created_at)}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
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
        <div className="w-1.5 h-10 bg-white/20 group-hover:bg-indigo-400 rounded-full mx-auto my-auto top-1/2 -translate-y-1/2 relative transition-colors" />
      </div>
    </aside>
  );
}
