import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnalyticsResponse } from "@/lib/types/analyticsType";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getanalytics: builder.query<AnalyticsResponse, void>({
      query: () => ({
        url: "/admin/analytics",
      }),
    }),
  }),
});

export const { useGetanalyticsQuery } = analyticsApi;
