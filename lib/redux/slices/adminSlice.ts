import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCycleRequest,
  CycleResponse,
} from "@/lib/types/applicationCycles";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ2Mzc0MTIsInR5cGUiOiJhY2Nlc3MifQ.SlBrxQqSD7ABv0dpblYidslo3NLgiVfNZxkeqysFDNA";

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
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 5 }) =>
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
      query: ({ id, ...cycleData }) => {
        console.log("cycleData in mutation query:", cycleData);
        return {
          url: `admin/cycles/${id}`,
          method: "PUT",
          body: { ...cycleData },
        };
      },
    }),
    getCycleById: builder.query({
      query: (id) => `/cycles/${id}`,
    }),
  }),
});

export const {
  useCreateCycleMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useEditCycleMutation,
  useGetCycleByIdQuery,
} = adminApi;
