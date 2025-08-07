import { ApplicationDetailsResponse, ApplicationStatusResponse} from "@/types/application";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getApplicationDetails: builder.query<ApplicationDetailsResponse, string>({
      query: (applicationId) => `/applications/${applicationId}`,
    }),
    getApplicationStatus: builder.query<ApplicationStatusResponse, void>({
      query: () => "applications/my-status",
    }),
  }),
});

export const { useGetApplicationStatusQuery, useGetApplicationDetailsQuery } =
  applicationsApi;
