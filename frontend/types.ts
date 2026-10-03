export interface RecordItem {
  id: number;
  job_id?: string | null;
  status: string;
  filename?: string | null;
  transcript_text?: string | null;
  summary_text?: string | null;
  created_at?: string | null;
}

export type ViewTab = "split" | "summary" | "transcript";
export type HistoryFilter = "all" | "completed" | "processing";
