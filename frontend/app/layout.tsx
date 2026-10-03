import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AudioLens AI • Enterprise Audio Intelligence & Transcription",
  description:
    "Transform audio recordings of any duration into high-precision transcripts with Gnani ASR and executive summaries with Meta LLaMA 3.3.",
  keywords: ["Gnani ASR", "Audio Transcription", "LLaMA 3.3", "Speech to Text", "AI Audio Summary"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06080f] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
