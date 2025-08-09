
export interface StartApplicationForm {
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  student_id: string;
  resume: File;
  country: string;
}

export interface ApplicationResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    school: string;
    degree: string;
    leetcode_handle: string;
    codeforces_handle: string;
    essay_why_a2sv: string;
    essay_about_you: string;
    resume_url: string;
    submitted_at: string;
    updated_at: string;
    student_id:string,
    country: string
  };
  message: string;
}
