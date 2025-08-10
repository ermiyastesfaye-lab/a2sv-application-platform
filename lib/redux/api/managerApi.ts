import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetApplicantsResponse } from "@/lib/types/manager";
import type { getReviewers as GetReviewersResponse } from "@/lib/types/manager";
import { ParamValue } from "next/dist/server/request/params";

export const managersApi = createApi({
  reducerPath: "managersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://a2sv-application-platform-backend-team1.onrender.com/manager",
    prepareHeaders: (headers, { getState }) => {
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
    getApplicantById: builder.query<any, { application_id: ParamValue }>({
      query: ({ application_id }) => ({
        url: `/applications/${application_id}`,
      }),
    }),
    decideApplication: builder.mutation<
      any,
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
