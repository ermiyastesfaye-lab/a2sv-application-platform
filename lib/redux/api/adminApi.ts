import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCycleRequest, CycleResponse } from '@/lib/types/applicationCycles';
import type { RootState } from '@/lib/redux/store';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://a2sv-application-platform-backend-team1.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
     
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCycle: builder.mutation<{ success: boolean; data: CycleResponse }, CreateCycleRequest>({
      query: (newCycle) => ({
        url: '/admin/cycles',
        method: 'POST',
        body: newCycle,
      }),
    }),
    activateCycle: builder.mutation<{ success: boolean; message:string}, {cycleId:string}>({
      query: ({cycleId}) => ({
        url: `/admin/cycles/${cycleId}/activate`,
        method: 'PATCH'
      }),
    }),

    deleteCycle: builder.mutation<{ success: boolean; message:string}, {cycleId:string}>({
      query: ({cycleId}) => ({
        url: `/admin/cycles/${cycleId}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { useCreateCycleMutation, useActivateCycleMutation,useDeleteCycleMutation } = adminApi;
