import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  GetApplicantsResponse } from '@/lib/types/manager';

export const managersApi= createApi({
  reducerPath: 'managersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://a2sv-application-platform-backend-team1.onrender.com/manager',
    prepareHeaders: (headers, { getState }) => {
     

      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTkwZWM4MC0wZjc3LTRlNjEtYjFkMy04YTgwNjJlNDY4NzAiLCJleHAiOjE3NTQ2NzQzMjUsInR5cGUiOiJhY2Nlc3MifQ.I5NHUH6-SKmaLsQgtJgOjn0T6sWUZietZTL-g9uGhz8';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getApplicants: builder.query<GetApplicantsResponse, void>({
        query: () => "/applications",
      }),
    getReviewers: builder.query<GetApplicantsResponse, { page: number; limit: number }>({
        query: ({ page, limit }) => `/applications/available-reviewers?page=${page}&limit=${limit}`,
      }),
  }),
});

export const { useGetApplicantsQuery, useGetReviewersQuery } = managersApi;
