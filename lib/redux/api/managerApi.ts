import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetApplicantsResponse } from "@/lib/types/manager";
import type { getReviewers as GetReviewersResponse } from "@/lib/types/manager";
import { ParamValue } from "next/dist/server/request/params";
interface DecideApplicationResponse {
  success: boolean;
  message: string;
  data: null;
}


export interface Application {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string;
}

export interface ApplicationsResponse {
  success: boolean;
  data: {
    applications: Application[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}
// types/application.ts
export interface Application {
  id: string;
  status: string;
  school: string;
  student_id: string;
  country: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string; // ISO date string
  updated_at: string;   // ISO date string
  applicant_name: string;
}

export interface Review {
  id: string;
  application_id: string;
  reviewer_id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface GetApplicantByIdResponse {
  success: boolean;
  data: {
    application: Application;
    review: Review;
  };
  message: string;
}
export const managersApi = createApi({
  reducerPath: "managersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://a2sv-application-platform-backend-team2.onrender.com/manager",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getApplicants: builder.query<
      GetApplicantsResponse,
      { page?: number; limit?: number; status?: string }
    >({
      query: (params = {}) => {
        const { page = 1, limit = 10, status } = params;
        let url = `/applications?page=${page}&limit=${limit}`;
        if (status) {
          url += `&status=${encodeURIComponent(status)}`;
        }
        return url;
      },
    }),
    getReviewers: builder.query<
      GetReviewersResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) =>
        `/applications/available-reviewers?page=${page}&limit=${limit}`,
    }),
    assignReviewer: builder.mutation<
      { success?: boolean; message?: string } | unknown,
      { application_id: string | ParamValue; reviewer_id: string }
    >({
      query: ({ application_id, reviewer_id }) => ({
        url: `/applications/${application_id}/assign/`,
        method: "PATCH",
        body: { reviewer_id },
      }),
    }),
    getApplicantById: builder.query<GetApplicantByIdResponse, { application_id: ParamValue }>({
      query: ({ application_id }) => ({
        url: `/applications/${application_id}`,
      }),
    }),
    decideApplication: builder.mutation<
      DecideApplicationResponse,
      { application_id: ParamValue; status: string; decision_notes: string }
    >({
      query: ({ application_id, status, decision_notes }) => ({
        url: `/applications/${application_id}/decide/`,
        method: "PATCH",
        body: { status, decision_notes },
      }),
    }),
  }),
});

export const {
  useGetApplicantsQuery,
  useGetReviewersQuery,
  useAssignReviewerMutation,
  useGetApplicantByIdQuery,
  useDecideApplicationMutation,
} = managersApi;
