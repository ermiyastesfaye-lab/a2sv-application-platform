import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCycleRequest,
  CycleResponse,
} from "@/lib/types/applicationCycles";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCycle: builder.mutation<
      { success: boolean; data: CycleResponse },
      CreateCycleRequest
    >({
      query: (newCycle) => ({
        url: "/admin/cycles",
        method: "POST",
        body: newCycle,
      }),
    }),
    activateCycle: builder.mutation<
      { success: boolean; message: string },
      { cycleId: string }
    >({
      query: ({ cycleId }) => ({
        url: `/admin/cycles/${cycleId}/activate`,
        method: "PATCH",
      }),
    }),

    deactivateCycle: builder.mutation<
      { success: boolean; message: string },
      { cycleId: string }
    >({
      query: ({ cycleId }) => ({
        url: `/admin/cycles/${cycleId}/deactivate`,
        method: "PATCH",
      }),
    }),

    deleteCycle: builder.mutation<
      { success: boolean; message: string },
      { cycleId: string }
    >({
      query: ({ cycleId }) => ({
        url: `/admin/cycles/${cycleId}`,
        method: "DELETE",
      }),
    }),
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 5 }) =>
        `admin/users?page=${page}&limit=${limit}`,
    }),
    getAllUserNoFilter: builder.query({
      query: ({ page = 1, limit = 1000 }) =>
        `admin/users?page=${page}&limit=${limit}`,
    }),
    getUserById: builder.query({
      query: (id) => `admin/users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "admin/users",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `admin/users/${id}`,
        method: "PUT",
        body: { ...userData },
      }),
    }),
    editCycle: builder.mutation({
      query: ({ id, ...cycleData }) => ({
        url: `admin/cycles/${id}`,
        method: "PUT",
        body: { ...cycleData },
      }),
    }),
    getCycleById: builder.query({
      query: (id) => `/cycles/${id}`,
    }),
    getAnalytices: builder.query({
      query: () => `/admin/analytics/`,
    }),
  }),
});

export const {
  useCreateCycleMutation,
  useGetAllUsersQuery,
  useGetAllUserNoFilterQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useEditCycleMutation,
  useGetCycleByIdQuery,
  useActivateCycleMutation,
  useDeactivateCycleMutation,
  useDeleteCycleMutation,
  useGetAnalyticesQuery,
} = adminApi;
