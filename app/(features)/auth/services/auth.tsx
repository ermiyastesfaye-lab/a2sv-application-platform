import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `auth/register`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credential) => ({
        url: `auth/token`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credential,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (credential) => ({
        url: `admin/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credential,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLoginAdminMutation } =
  authApi;