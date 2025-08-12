import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetCycleResponse } from "@/lib/types/applicationCycles";

export const cyclesApi = createApi({
  reducerPath: "cyclesApi",
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
    getCycles: builder.query<GetCycleResponse, { page: number; limit: number }>(
      {
        query: ({ page, limit }) => `/cycles?page=${page}&limit=${limit}`,
      }
    ),

    getActiveCycles: builder.query({
      query: () => `/cycles/active/`,
    }),
  }),
});

export const { useGetCyclesQuery, useGetActiveCyclesQuery } = cyclesApi;
