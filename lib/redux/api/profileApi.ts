import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
}

export interface ProfileResponse {
  success: boolean;
  data: UserProfile;
  message: string;
}

export interface UpdateProfileRequest {
  full_name: string;
  email: string;
  profile_picture?: File;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  data: null;
  message: string;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "profile/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: "profile/me",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (passwordData) => ({
        url: "profile/me/change-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
