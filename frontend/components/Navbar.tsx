"use client";

import Link from "next/link";

interface NavbarProps {
  onNewUpload: () => void;
}

export default function Navbar({ onNewUpload }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/[0.08] px-3.5 sm:px-6 h-12 sm:h-13 flex items-center justify-between shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Link href="/" className="group flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="h-7 w-7 sm:h-7.5 sm:w-7.5 rounded-lg bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <div className="h-full w-full rounded-[6.5px] bg-[#090d1a] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1 whitespace-nowrap">
              <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                AudioLens
              </span>
              <span className="text-indigo-400 font-extrabold text-xs sm:text-sm">AI</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Gnani v3
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        <Link
          href="/architecture"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 glass-pill hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-white/10 transition-all"
        >
          <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="hidden sm:inline">Architecture</span>
          <span className="sm:hidden">Specs</span>
        </Link>

        <button
          onClick={onNewUpload}
          className="shimmer-effect flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-600/25 transition-all cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Upload</span>
        </button>
      </div>
    </header>
  );
}
