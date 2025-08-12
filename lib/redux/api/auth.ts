import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
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

    forgotPassword: builder.mutation({
      query: ({ email, callback_url }) => ({
        url: `auth/forgot-password`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email, callback_url },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, new_password }) => ({
        url: `auth/reset-password`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { token, new_password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginAdminMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
