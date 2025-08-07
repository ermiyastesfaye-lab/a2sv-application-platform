import {
  ApplicationDetailsResponse,
  ApplicationStatusResponse,
} from "@/types/application";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getApplicationDetails: builder.query<ApplicationDetailsResponse, string>({
      query: (applicationId) => `/applications/${applicationId}`,
      providesTags: ["Application"],
    }),
    getApplicationStatus: builder.query<ApplicationStatusResponse, void>({
      query: () => "applications/my-status",
      providesTags: ["Application"],
    }),

    submitApplication: builder.mutation<any, string>({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplication: builder.mutation<any, string>({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
    getCyclesClient: builder.query({
      query: () => `/cycles`,
    }),
    getProfile: builder.query({
      query: () => ({
        url: `profile/me`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCyclesClientQuery,
  useGetApplicationStatusQuery,
  useGetApplicationDetailsQuery,
  useDeleteApplicationMutation,
  useSubmitApplicationMutation,
  useGetProfileQuery,
} = applicationsApi;
