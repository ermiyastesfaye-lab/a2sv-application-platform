export interface ApplicationStatusResponse {
  success: boolean;
  message: string;
  data: BasicApplicationData;
}

export interface ApplicationDetailsResponse {
  success: boolean;
  message: string;
  data: FullApplicationData;
}

export interface BasicApplicationData {
  id: string;
  status: ApplicationStatus;
  school: string;
  submitted_at: string;
}

export interface FullApplicationData extends BasicApplicationData {
  degree: string;
  leetcode_handle: string | null;
  codeforces_handle: string | null;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string | null;
  updated_at: string;
}

export type ApplicationStatus =
  | "not_started"
  | "in_progress"
  | "under_review"
  | "interview"
  | "decision_made";

export type TimelineItemStatus = "complete" | "current" | "pending";
