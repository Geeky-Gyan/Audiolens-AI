"use client";

import Link from "next/link";

interface NavbarProps {
  onNewUpload: () => void;
}

export default function Navbar({ onNewUpload }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/[0.08] px-6 lg:px-10 py-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="h-full w-full rounded-[14px] bg-[#090d1a] flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  AudioLens
                </span>
                <span className="text-indigo-400">AI</span>
              </h1>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Gnani ASR v3 Active
              </div>
            </div>
            <p className="text-sm text-slate-300 font-medium hidden sm:block">
              Speech-to-Text &amp; Autonomous LLaMA 3.3 Intelligence Platform
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3.5">
        <Link
          href="/architecture"
          className="flex items-center gap-2.5 px-5 md:px-6 py-2.5 md:py-3 glass-pill hover:bg-white/[0.12] text-white text-sm md:text-base font-extrabold rounded-xl border border-white/15 transition-all shadow-lg shadow-indigo-500/10 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>System Specs &amp; Architecture</span>
        </Link>

        <button
          onClick={onNewUpload}
          className="shimmer-effect flex items-center gap-2.5 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm md:text-base font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Audio Upload
        </button>
      </div>
    </header>
  );
}
