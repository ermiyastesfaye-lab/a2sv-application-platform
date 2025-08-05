export interface ApplicationFormValues {
  idNumber: string;
  university: string;
  degree: string;

  codeforces: string;
  leetcode: string;
  github: string;

  essay1: string;
  essay2: string;
  resume: File | null;
}
