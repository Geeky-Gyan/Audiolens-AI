import Link from "next/link";

export const metadata = {
  title: "System Architecture & Engineering Specification | AudioLens AI",
  description:
    "Comprehensive engineering architecture, pipeline data flow, asynchronous background worker mechanics, and scalability tradeoffs of AudioLens AI.",
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col font-sans ambient-mesh selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[42rem] h-[42rem] bg-indigo-600/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-[38rem] h-[38rem] bg-violet-600/12 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[36rem] h-[36rem] bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 glass-panel border-b border-white/[0.08] px-6 lg:px-12 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105 shadow-md"
            title="Back to AudioLens Application"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                System Architecture &amp; Engineering Specs
              </h1>
              <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-bold font-mono">
                v2.5 Architecture
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">AudioLens AI • Technical Specification &amp; Execution Blueprint</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <a
            href="https://github.com/Geeky-Gyan/Audiolens-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 md:px-6 py-2.5 md:py-3 glass-pill hover:bg-white/[0.12] text-white text-sm md:text-base font-extrabold rounded-xl border border-white/15 transition-all shadow-lg shadow-indigo-500/10 hover:scale-[1.02] active:scale-[0.98]"
            title="View Source on GitHub"
          >
            <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Repo</span>
          </a>

          <Link
            href="/"
            className="shimmer-effect flex items-center gap-2.5 px-6 py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm md:text-base font-black rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Open Live App</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-[1550px] mx-auto w-full p-6 lg:p-12 space-y-12 relative z-10">
        <section className="space-y-5 pt-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            Enterprise Speech Pipeline &amp; Scalability Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            How AudioLens AI Operates at Scale
          </h2>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-5xl">
            AudioLens AI is an enterprise audio intelligence platform engineered with{" "}
            <strong className="text-white font-extrabold">Next.js 16</strong>, <strong className="text-white font-extrabold">FastAPI</strong>,{" "}
            <strong className="text-white font-extrabold">Supabase PostgreSQL</strong>,{" "}
            <strong className="text-indigo-300 font-extrabold">Gnani Prisma ASR</strong>, and{" "}
            <strong className="text-violet-300 font-extrabold">Meta LLaMA 3.3 (via Groq Cloud)</strong>.
            This document outlines the decoupled architecture ensuring zero HTTP connection timeouts, sub-second API handshakes, and resilient background task orchestration for audio recordings of arbitrary duration.
          </p>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-white flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                End-to-End Pipeline Execution Flow
              </h3>
              <p className="text-sm md:text-base text-slate-300 pt-1">
                Decoupled asynchronous worker model with optimistic client handshakes
              </p>
            </div>
            <span className="text-xs md:text-sm px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono font-bold">
              6 Decoupled Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-white/10 flex flex-col items-center justify-between gap-3 shadow-xl hover:border-indigo-500/40 transition">
              <span className="text-3xl">🎙️</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-white block">1. Client Upload</span>
                <span className="text-xs text-slate-300 block">Next.js Multipart Form</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-indigo-300">HTTP POST</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-indigo-500/50 flex flex-col items-center justify-between gap-3 shadow-xl shadow-indigo-500/15 hover:border-indigo-400 transition">
              <span className="text-3xl">⚡</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-indigo-300 block">2. FastAPI Gateway</span>
                <span className="text-xs text-slate-300 block">Disk Stream + DB Row</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">&lt; 100ms Handshake</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-amber-500/30 flex flex-col items-center justify-between gap-3 shadow-xl hover:border-amber-500/50 transition">
              <span className="text-3xl">🔄</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-amber-300 block">3. Gnani Prisma ASR</span>
                <span className="text-xs text-slate-300 block">Batch Vachana Engine</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">en-IN Acoustic</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-violet-500/40 flex flex-col items-center justify-between gap-3 shadow-xl hover:border-violet-400 transition">
              <span className="text-3xl">🦙</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-violet-300 block">4. LLaMA 3.3 70B</span>
                <span className="text-xs text-slate-300 block">Groq Cloud Inference</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold">500+ tok/sec</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-emerald-500/30 flex flex-col items-center justify-between gap-3 shadow-xl hover:border-emerald-500/50 transition">
              <span className="text-3xl">🐘</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-emerald-300 block">5. Supabase Postgres</span>
                <span className="text-xs text-slate-300 block">Persist Outputs &amp; Time</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">SQLModel ORM</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c]/90 border border-emerald-500/50 flex flex-col items-center justify-between gap-3 shadow-xl shadow-emerald-500/15 hover:border-emerald-400 transition">
              <span className="text-3xl">✨</span>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-emerald-400 block">6. Real-Time View</span>
                <span className="text-xs text-slate-300 block">Interactive UI Deck</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Search &amp; Audio</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
              Technology Stack &amp; Infrastructure
            </h3>
            <span className="text-xs md:text-sm text-slate-400 font-medium">Production-grade components</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚛️</span>
                  <h4 className="text-lg font-bold text-white">Next.js 16 (App Router)</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">Frontend</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                React 19 Server and Client Component architecture, Tailwind CSS v4, custom cyber-minimal glassmorphism, responsive soundwave visualizers, and resizable split layouts.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-lg font-bold text-indigo-300">FastAPI &amp; Async Tasks</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300">Backend</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                High-performance Python 3.12 async server with Pydantic v2 data validation, non-blocking BackgroundTasks pipeline, rate-limit backoff handling, and RESTful CRUD endpoints.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎙️</span>
                  <h4 className="text-lg font-bold text-amber-300">Gnani Prisma STT v3</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300">ASR Engine</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gnani Vachana batch speech-to-text API configured with <code className="text-amber-200">gnani-prisma-v2.5</code> for Indian English (<code className="text-amber-200">en-IN</code>), acoustic noise cancellation, and automated batch reconstruction.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🦙</span>
                  <h4 className="text-lg font-bold text-violet-300">Meta LLaMA 3.3 70B</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300">Intelligence</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ultra-low latency inference via Groq Cloud running at 500+ tokens/second. Extracts structured executive summaries, action items, and key takeaways from raw transcripts.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐘</span>
                  <h4 className="text-lg font-bold text-emerald-300">Supabase PostgreSQL</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">Database</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                SQLModel ORM relational persistence hosted on Supabase Cloud. Manages job ticket IDs, lifecycle states, formatted transcripts, executive briefs, and timestamps.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔊</span>
                  <h4 className="text-lg font-bold text-cyan-300">Chunked Audio Stream</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300">Media</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dedicated <code className="text-cyan-200">/api/audio/&#123;id&#125;</code> endpoint supporting HTTP range requests for seeking and smooth audio streaming within the built-in HTML5 player.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-400" />
            1. Detailed Lifecycle: From Upload to Executive Brief
          </h3>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed">
            When a user submits an audio file into the web application, the lifecycle executes through six asynchronous stages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {[
              {
                step: "01",
                title: "Client-Side Ingestion",
                desc: "The Next.js client packages the raw audio file into a multipart/form-data payload and transmits it to FastAPI (/api/upload). Supports MP3, WAV, OGG, M4A, FLAC, and AAC.",
                tag: "Multipart Upload",
                badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
              },
              {
                step: "02",
                title: "Immediate Handshake & Ticket Generation",
                desc: "FastAPI immediately inserts a TranscriptRecord in Supabase PostgreSQL with status 'received', saves the audio to local storage, registers a BackgroundTask, and returns { record_id } in under 100ms.",
                tag: "< 100ms Latency",
                badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
              },
              {
                step: "03",
                title: "Batch Job Registration with Gnani",
                desc: "The background task creates a batch speech recognition job via Gnani's Vachana API (/stt/v3/batch/jobs) specifying en-IN language code and gnani-prisma-v2.5 model.",
                tag: "Batch ASR API",
                badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
              },
              {
                step: "04",
                title: "Asynchronous Polling & HTTP 429 Resilience",
                desc: "The worker triggers job execution, entering a non-blocking asynchronous polling loop (GET /jobs/{id}) with rate-limit exponential backoff until completion.",
                tag: "Non-blocking Loop",
                badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
              },
              {
                step: "05",
                title: "Transcript Download & Preparation",
                desc: "The worker queries Gnani's files endpoint (/jobs/{id}/files?status=COMPLETED) to obtain the signed transcript URL, retrieves the text payload, and prepares it for LLM inference.",
                tag: "Payload Parser",
                badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
              },
              {
                step: "06",
                title: "LLaMA 3.3 Intelligence & Database Commit",
                desc: "The raw transcript is passed to Meta LLaMA 3.3 70B via Groq Cloud. The executive summary, key points, and raw transcript are committed to PostgreSQL, updating status to 'completed'.",
                tag: "Groq Cloud 500 T/s",
                badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#06080f]/80 border border-white/10 flex items-start gap-4 hover:border-indigo-500/40 transition">
                <span className="text-xl font-black font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base md:text-lg font-bold text-white">{item.title}</h4>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
            2. Storage Architecture &amp; Database Model
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#06080f]/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-300 font-bold text-lg">
                <span>📁</span>
                <h4>Local File System Storage</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Uploaded recordings are saved to an isolated local directory:
              </p>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-sm text-indigo-300 break-all shadow-inner">
                backend/uploads/&#123;record_id&#125;_&#123;filename&#125;
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                This enables instantaneous streaming to the client through the <code className="text-indigo-300 font-mono">/api/audio/&#123;record_id&#125;</code> endpoint, allowing HTML5 seeking without reloading the full file into memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-lg">
                <span>🐘</span>
                <h4>Supabase PostgreSQL Database Schema</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Managed relational database using the <strong>SQLModel</strong> ORM schema (<code className="text-emerald-300 font-mono">TranscriptRecord</code>):
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-white/5 text-slate-300 border-b border-white/10 font-bold">
                    <tr>
                      <th className="p-2.5">Field</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">id</td>
                      <td className="p-2.5 text-slate-400">INTEGER (PK)</td>
                      <td className="p-2.5 text-slate-300">Primary Key (Autoincrement)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">job_id</td>
                      <td className="p-2.5 text-slate-400">VARCHAR</td>
                      <td className="p-2.5 text-slate-300">Gnani ASR batch job UUID</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">status</td>
                      <td className="p-2.5 text-slate-400">VARCHAR</td>
                      <td className="p-2.5 text-slate-300">received ➔ processing ➔ completed</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">transcript_text</td>
                      <td className="p-2.5 text-slate-400">TEXT</td>
                      <td className="p-2.5 text-slate-300">Full speech-to-text transcript</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">summary_text</td>
                      <td className="p-2.5 text-slate-400">TEXT</td>
                      <td className="p-2.5 text-slate-300">LLaMA 3.3 executive summary</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-bold">created_at</td>
                      <td className="p-2.5 text-slate-400">TIMESTAMP</td>
                      <td className="p-2.5 text-slate-300">Timezone-aware UTC timestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-violet-400" />
            3. Handling Long Audio (2+ Minutes &amp; Beyond)
          </h3>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed">
            Synchronous Speech-to-Text architectures fail catastrophically on long audio recordings because standard HTTP requests time out after 30–60 seconds, reverse proxies terminate idle connections, and holding open client connections degrades server concurrency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <span>✓</span> Chunking &amp; Batching
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gnani&apos;s distributed ASR infrastructure automatically splits, processes, and reassembles multi-minute or multi-hour audio files without memory pressure on our web application.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <span>✓</span> Non-Blocking Async Polling
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Background tasks poll using non-blocking <code className="text-indigo-300">httpx.AsyncClient</code> with <code className="text-indigo-300">asyncio.sleep()</code> intervals, avoiding thread-blocking while freeing the FastAPI event loop.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <span>✓</span> Rate-Limit (HTTP 429) Guard
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                When polling high-load APIs, rate limits may trigger. Our worker includes automated retry loops with 15-second pauses whenever HTTP 429 is encountered, ensuring jobs complete smoothly.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
            4. Synchronous vs. Background Execution Matrix
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-white/5 text-slate-200 border-b border-white/10 font-bold">
                <tr>
                  <th className="p-4">Pipeline Stage</th>
                  <th className="p-4">Execution Mode</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Architecture Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#06080f]/60 text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white">Audio Ingestion &amp; DB Row Reservation</td>
                  <td className="p-4 text-indigo-400 font-extrabold">Synchronous</td>
                  <td className="p-4 font-mono text-slate-300">&lt; 100ms</td>
                  <td className="p-4">Returns ticket number immediately so UI starts progress stepper without freezing.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Gnani Batch Job Creation &amp; Upload</td>
                  <td className="p-4 text-amber-400 font-extrabold">Background Worker</td>
                  <td className="p-4 font-mono text-slate-300">2 - 5s</td>
                  <td className="p-4">Transferring large payloads to external speech APIs must not block HTTP clients.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">ASR Audio Processing &amp; Status Polling</td>
                  <td className="p-4 text-amber-400 font-extrabold">Background Worker</td>
                  <td className="p-4 font-mono text-slate-300">20 - 50s</td>
                  <td className="p-4">Speech recognition takes duration proportional to audio length. Async loops avoid timeouts.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">LLaMA 3.3 Executive Summarization</td>
                  <td className="p-4 text-amber-400 font-extrabold">Background Worker</td>
                  <td className="p-4 font-mono text-slate-300">1 - 3s</td>
                  <td className="p-4">Groq generates summaries at 500+ tokens/sec, updating the database upon completion.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Client UI Polling (<code className="text-xs">GET /api/status/&#123;id&#125;</code>)</td>
                  <td className="p-4 text-indigo-400 font-extrabold">Synchronous</td>
                  <td className="p-4 font-mono text-slate-300">&lt; 15ms</td>
                  <td className="p-4">Instant index lookup in PostgreSQL to fetch the latest state for the UI stepper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-pink-400" />
            5. What We&apos;d Do Differently with More Time (Production Scaling)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <h4 className="text-base md:text-lg font-bold text-white">
                1. Dedicated Distributed Queue (Celery / BullMQ + Redis)
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Replace FastAPI&apos;s in-process <code className="text-indigo-300 font-mono">BackgroundTasks</code> with durable distributed workers. In production, pod restarts would not interrupt in-flight jobs. Celery provides automated retries, dead-letter queues, and horizontal worker scaling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <h4 className="text-base md:text-lg font-bold text-white">
                2. Direct Presigned Uploads (S3 / Supabase Storage)
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Allow clients to upload audio files directly to object storage via presigned S3 URLs, bypassing application server disk storage and optimizing network throughput.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <h4 className="text-base md:text-lg font-bold text-white">
                3. Server-Sent Events (SSE) or WebSockets
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Replace client HTTP interval polling with real-time push streaming to instantly notify the UI the second transcription or summarization is finished without 3-second polling cycles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080f]/70 border border-white/5 space-y-2.5">
              <h4 className="text-base md:text-lg font-bold text-white">
                4. Speaker Diarization &amp; Clickable Timestamps
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Parse Gnani&apos;s word-level timestamps to present speaker turns and enable interactive seeking in the audio player by clicking directly on transcript paragraphs.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pb-12">
          <Link
            href="/"
            className="shimmer-effect inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            ← Return to AudioLens AI Application
          </Link>
          <a
            href="https://github.com/Geeky-Gyan/Audiolens-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel hover:bg-white/[0.12] text-white font-extrabold text-base border border-white/15 shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub: Geeky-Gyan/Audiolens-AI ↗</span>
          </a>
        </div>
      </main>
    </div>
  );
}
