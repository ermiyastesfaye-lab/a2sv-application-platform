import {
  ApplicationDetailsResponse,
  ApplicationStatusResponse,
} from "@/types/application";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  StartApplicationForm,
  ApplicationResponse,
} from "@/app/(features)/application/types";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    createApplication: builder.mutation<ApplicationResponse, FormData>({
      query: (formData) => {
        return {
          url: "/applications/",
          method: "POST",
          body: formData,
        };
      },
    }),

    updateApplication: builder.mutation<
      ApplicationResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/applications/${id}`,
        method: "PUT",
        body,
      }),
    }),

    getApplicationDetails: builder.query<ApplicationResponse, string>({
      query: (id) => `/applications/${id}`,
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
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useGetCyclesClientQuery,
  useGetApplicationStatusQuery,
  useGetApplicationDetailsQuery,
  useDeleteApplicationMutation,
  useSubmitApplicationMutation,
  useGetProfileQuery,
} = applicationsApi;
