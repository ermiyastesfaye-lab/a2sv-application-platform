import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  GetCycleResponse } from '@/lib/types/applicationCycles';
import type { RootState } from '@/lib/redux/store';

export const cyclesApi = createApi({
  reducerPath: 'cyclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://a2sv-application-platform-backend-team1.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
     
      const token =
        (getState() as RootState).auth?.token 
       
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCycles: builder.query<GetCycleResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/cycles?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetCyclesQuery } = cyclesApi;