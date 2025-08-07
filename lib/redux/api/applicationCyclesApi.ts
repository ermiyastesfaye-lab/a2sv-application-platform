import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetCycleResponse } from "@/lib/types/applicationCycles";
import type { RootState } from "@/lib/redux/store";

export const cyclesApi = createApi({
  reducerPath: "cyclesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ1Njg4MjAsInR5cGUiOiJhY2Nlc3MifQ.gzTZSWmIgsy-YllNuumMHfyfmMTI2CrscIzywH8i-F4";

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
  }),
});

export const { useGetCyclesQuery } = cyclesApi;
