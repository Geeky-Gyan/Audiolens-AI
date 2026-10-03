"use client";

import { RecordItem } from "@/types";

interface ProcessingPipelineProps {
  activeRecord: RecordItem;
  elapsedSeconds: number;
  getStatusDescription: (st: string) => string;
  getProgressPercentage: (st: string, elapsedSeconds: number) => number;
  getStepStatus: (step: number) => "active" | "done" | "error" | "pending";
  getHumanReadableErrorMessage: (st: string) => string;
  formatTime: (seconds: number) => string;
  onNewUpload: () => void;
  onRetry: () => void;
}

export default function ProcessingPipeline({
  activeRecord,
  elapsedSeconds,
  getStatusDescription,
  getProgressPercentage,
  getStepStatus,
  getHumanReadableErrorMessage,
  formatTime,
  onNewUpload,
  onRetry,
}: ProcessingPipelineProps) {
  const isFailed = activeRecord.status.includes("failed");

  return (
    <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-4">
          {!isFailed && (
            <div className="flex items-end gap-1.5 h-7">
              <span className="w-2 bg-indigo-500 rounded-full wave-bar-1" />
              <span className="w-2 bg-indigo-400 rounded-full wave-bar-2" />
              <span className="w-2 bg-violet-400 rounded-full wave-bar-3" />
              <span className="w-2 bg-cyan-400 rounded-full wave-bar-4" />
              <span className="w-2 bg-indigo-500 rounded-full wave-bar-5" />
            </div>
          )}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              {!isFailed
                ? "Asynchronous Speech Pipeline In Progress"
                : "Pipeline Interrupted"}
            </h3>
            <p className="text-sm md:text-base text-slate-300 pt-0.5">
              {getStatusDescription(activeRecord.status)}
            </p>
          </div>
        </div>

        {!isFailed && (
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="px-4 py-2 rounded-full bg-[#06080f] border border-white/10 text-sm font-mono text-indigo-300 flex items-center gap-2.5 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              <span>Elapsed: {formatTime(elapsedSeconds)}</span>
            </div>
          </div>
        )}
      </div>

      {!isFailed && (
        <div className="space-y-2.5">
          <div className="w-full bg-[#06080f] rounded-full h-3 overflow-hidden border border-white/10 p-[1px]">
            <div
              className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 h-full transition-all duration-700 rounded-full shadow-lg shadow-indigo-500/30"
              style={{ width: `${getProgressPercentage(activeRecord.status, elapsedSeconds)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs md:text-sm text-slate-300 font-mono font-medium">
            <span>1. Audio Ingestion &amp; Storage</span>
            <span>2. Gnani Batch ASR</span>
            <span>3. LLaMA 3.3 Intelligence</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { step: 1, title: "1. Upload File", desc: "Received by backend queue" },
          { step: 2, title: "2. Gnani ASR", desc: "Batch speech recognition" },
          { step: 3, title: "3. Summarize", desc: "Meta LLaMA 3.3 70B" },
        ].map(({ step, title, desc }) => {
          const stepState = getStepStatus(step);
          return (
            <div
              key={step}
              className={`p-5 rounded-2xl border transition-all ${
                stepState === "done"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-sm shadow-emerald-500/10"
                  : stepState === "active"
                  ? "bg-indigo-500/15 border-indigo-500/50 text-indigo-200 animate-pulse shadow-lg shadow-indigo-500/15"
                  : stepState === "error"
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  : "bg-[#06080f]/50 border-white/[0.06] text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">{title}</span>
                {stepState === "done" && <span className="text-emerald-400 text-xs md:text-sm font-bold">✓ Done</span>}
                {stepState === "active" && (
                  <span className="text-indigo-400 text-xs md:text-sm font-mono font-bold animate-pulse">Running...</span>
                )}
              </div>
              <span className="text-xs md:text-sm opacity-90 pt-1.5 block">{desc}</span>
            </div>
          );
        })}
      </div>

      {isFailed && (
        <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-rose-300">
                Transcription Pipeline Error
              </h4>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {getHumanReadableErrorMessage(activeRecord.status)}
              </p>
              <p className="text-xs md:text-sm font-mono text-rose-400/80 pt-1">
                Diagnostic code: {activeRecord.status}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-rose-500/20">
            <button
              onClick={onNewUpload}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold transition cursor-pointer"
            >
              Upload Another Recording
            </button>
            <button
              onClick={onRetry}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-sm font-bold transition cursor-pointer"
            >
              Retry Processing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
