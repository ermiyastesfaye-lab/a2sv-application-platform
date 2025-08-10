export interface Applicant {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string;
}

export interface GetApplicantsResponse {
  success: boolean;
  data: {
    applications: Applicant[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

export interface Reviewer {
  id: string;
  full_name: string;
  email: string;
}

export interface getReviewers {
  success: boolean;
  data: {
    reviewers: Reviewer[];
    total_count: number;
  };
  message: string;
}
