export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export const formatDate = (isoString?: string | null): string => {
  if (!isoString) return "Recently";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Recently";
  }
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const getStatusDescription = (st: string): string => {
  if (st === "sending_to_server") return "Transmitting audio payload to FastAPI backend server...";
  if (st === "received") return "Payload received. Registering asynchronous background worker pipeline...";
  if (st === "uploading_to_gnani") return "Dispatching audio to Gnani Prisma speech recognition engine...";
  if (st === "processing_audio") return "Speech recognition actively in progress with Gnani ASR...";
  if (st === "summarizing") return "Transcription complete! Generating executive summary with Meta LLaMA 3.3...";
  if (st === "completed") return "Transcription and intelligence summary successfully completed.";
  if (st.includes("failed")) return "Processing encountered an issue. See diagnostic details below.";
  return "Initializing pipeline...";
};

export const getProgressPercentage = (st: string, elapsedSeconds: number = 0): number => {
  if (st === "sending_to_server") return 15;
  if (st === "received") return 25;
  if (st === "uploading_to_gnani") return 40;
  if (st === "processing_audio") return Math.min(88, 48 + Math.floor(elapsedSeconds / 2));
  if (st === "summarizing") return 94;
  if (st === "completed") return 100;
  return 20;
};

export const getHumanReadableErrorMessage = (st: string): string => {
  if (st.includes("failed_timeout")) {
    return "Connection timeout: The speech recognition server took too long to respond. The audio may be very long or the network was interrupted. Please retry.";
  }
  if (st.includes("failed_auth")) {
    return "Authentication error: The Gnani ASR API Key is invalid or expired. Please check GNANI_API_KEY in backend/.env.";
  }
  if (st.includes("failed_audio")) {
    return "Audio file error: Gnani ASR rejected the file. It may be corrupted, empty, or encoded in an unsupported codec. Please try an MP3, WAV, or OGG file.";
  }
  if (st.includes("failed_size")) {
    return "Payload limit: The file exceeds maximum batch upload limits for the API.";
  }
  if (st.includes("failed_at_gnani")) {
    return `Gnani ASR job failure: ${st.replace("failed_at_gnani: ", "")}.`;
  }
  return `Background task error: ${st.replace("failed: ", "")}. Please retry or select another audio recording.`;
};

export const downloadTextFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
