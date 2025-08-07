import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ1NTk0MjgsInR5cGUiOiJhY2Nlc3MifQ.XHKhT6RTdKnJrhk8jdNyGle-4InKQiPrLXbhb5Syls0";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
