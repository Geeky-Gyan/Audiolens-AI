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
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/15 to-cyan-500/15 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg shadow-indigo-500/10">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          Gnani Prisma ASR • Meta LLaMA 3.3 via Groq
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Turn Spoken Audio into{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Precision Intelligence
          </span>
        </h2>

        <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          Upload voice recordings, team discussions, lectures, or interviews of{" "}
          <span className="text-white font-semibold">any duration</span>. Our asynchronous background
          pipeline guarantees zero HTTP timeouts, flawless ASR transcripts, and instant AI executive briefs.
        </p>
      </div>

      {uploadError && (
        <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start justify-between gap-3 text-base text-rose-200 shadow-xl">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-1">
              <strong className="block text-rose-300 font-bold text-base">Upload Error Encountered</strong>
              <p className="text-sm md:text-base text-rose-200/90 leading-relaxed">{uploadError}</p>
            </div>
          </div>
          <button
            onClick={() => setUploadError(null)}
            className="text-slate-400 hover:text-white text-xs md:text-sm px-3 py-1.5 rounded-lg hover:bg-rose-500/20 transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center gap-6 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
          isDragging
            ? "border-cyan-400 bg-cyan-500/10 scale-[1.01] shadow-2xl shadow-cyan-500/20"
            : file
            ? "border-emerald-500/50 bg-[#0d1527]/90 shadow-2xl shadow-emerald-500/10"
            : "border-white/10 hover:border-indigo-500/50 bg-[#0a0f1d]/70 hover:bg-[#0c1326]/80 glass-card"
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
          <div className="flex flex-col items-center gap-4 w-full max-w-lg">
            <div className="flex items-end gap-2 h-14 px-8 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 bg-emerald-400 rounded-full wave-bar-1" />
              <span className="w-2 bg-emerald-300 rounded-full wave-bar-2" />
              <span className="w-2 bg-emerald-400 rounded-full wave-bar-3" />
              <span className="w-2 bg-cyan-400 rounded-full wave-bar-4" />
              <span className="w-2 bg-emerald-400 rounded-full wave-bar-5" />
              <span className="w-2 bg-emerald-300 rounded-full wave-bar-6" />
              <span className="w-2 bg-emerald-400 rounded-full wave-bar-2" />
            </div>

            <div className="space-y-1.5">
              <p className="text-lg md:text-2xl font-bold text-white flex items-center justify-center gap-2">
                <span className="text-emerald-400 font-extrabold">✓</span> {file.name}
              </p>
              <p className="text-sm md:text-base text-slate-300">
                {formatFileSize(file.size)} • Ready for Gnani Speech-to-Text
              </p>
            </div>

            {fileAudioPreviewUrl && (
              <div
                className="pt-2 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <audio
                  controls
                  src={fileAudioPreviewUrl}
                  className="w-full h-10 rounded-xl opacity-90 shadow-md"
                />
                <p className="text-xs text-slate-400 pt-1.5 font-medium">Listen to audio preview before starting</p>
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-sm text-rose-400 hover:text-rose-300 underline pt-1 font-semibold cursor-pointer"
            >
              Choose another file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-extrabold text-white">
                Drop your audio recording here, or{" "}
                <span className="text-indigo-400 group-hover:text-cyan-300 underline decoration-indigo-400/50 underline-offset-4 transition-colors">
                  browse
                </span>
              </p>
              <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto">
                Supports MP3, WAV, OGG, M4A, FLAC, AAC of any size or duration.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {["MP3", "WAV", "M4A", "FLAC", "OGG", "AAC"].map((ext) => (
                <span
                  key={ext}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs md:text-sm font-mono font-bold text-slate-200"
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
        className="shimmer-effect w-full py-5 px-8 rounded-2xl font-black text-lg md:text-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-2xl shadow-indigo-600/35 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex items-center justify-center gap-3.5 hover:scale-[1.01] active:scale-[0.99]"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Transcribing &amp; Generating LLaMA Summary...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Transcribe &amp; Summarize Audio</span>
          </>
        )}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.5 pt-2">
        <div className="glass-card p-5 rounded-2xl flex flex-col gap-2.5 border border-white/[0.08] hover:border-indigo-500/40">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Gnani Prisma v3 Engine</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              High-precision batch speech recognition tuned for Indian &amp; global English accents with background noise removal.
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col gap-2.5 border border-white/[0.08] hover:border-violet-500/40">
          <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Meta LLaMA 3.3 70B</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              Autonomous executive summarization and key takeaway extraction powered by Groq Cloud at 500+ tokens/sec.
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col gap-2.5 border border-white/[0.08] hover:border-cyan-500/40">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Zero Timeout Worker</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              Non-blocking FastAPI asynchronous worker loop processes recordings of arbitrary duration without connection aborts.
            </p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col gap-2.5 border border-white/[0.08] hover:border-emerald-500/40">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Supabase Cloud DB</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              SQLModel relational persistence guarantees permanent history retention, instant search queries, and audio streaming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
