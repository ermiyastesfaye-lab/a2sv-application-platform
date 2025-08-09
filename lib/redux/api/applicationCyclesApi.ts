
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  GetCycleResponse } from '@/lib/types/applicationCycles';


export const cyclesApi = createApi({
  reducerPath: "cyclesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
    prepareHeaders: (headers, { getState }) => {

     
      const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ZTFlODJiNS1mYWRmLTRiOTEtOGUzNi04N2ViNmViMzE0NWQiLCJleHAiOjE3NTQ3NDM4NzQsInR5cGUiOiJhY2Nlc3MifQ.NUaw9ji-PPwJpZAqz6_2jCm0XPzHm9atJggwXogUxvo'
      //const token = localStorage.getItem('token');
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
