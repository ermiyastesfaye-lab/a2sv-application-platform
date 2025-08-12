import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AssignedReview {
  application_id: string;
  applicant_name: string;
  status: string;
  submission_date: string;
  profile_picture_url?: string | null;
  review_details?: ReviewDetails | null;
}

export interface AssignedReviewsResponse {
  success: boolean;
  data: {
    reviews: AssignedReview[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

export interface ApplicantDetails {
  id: string;
  applicant_name: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
}

export interface ReviewDetails {
  id: string;
  application_id: string;
  reviewer_id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDetailsResponse {
  success: boolean;
  data: {
    id: string;
    applicant_details: ApplicantDetails;
    review_details: ReviewDetails | null;
  };
  message: string;
}

export interface UpdateReviewRequest {
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
}

export interface UpdateReviewResponse {
  success: boolean;
  data: ReviewDetails;
  message: string;
}

// Create a baseQuery instance to reuse inside queryFn
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://a2sv-application-platform-backend-team2.onrender.com/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  validateStatus: (response) => {
    if (response.status === 403) {
      return true;
    }
    return response.status >= 200 && response.status < 300;
  },
});

export const reviewerApi = createApi({
  reducerPath: "reviewerApi",
  baseQuery: rawBaseQuery,
  tagTypes: ["AssignedReviews", "ApplicationDetails"],
  endpoints: (builder) => ({
    getAssignedReviews: builder.query<
      AssignedReviewsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `reviews/assigned?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["AssignedReviews"],
    }),
    getApplicationDetails: builder.query<ApplicationDetailsResponse, string>({
      query: (applicationId) => ({
        url: `reviews/${applicationId}`,
        method: "GET",
      }),
      providesTags: (result, error, applicationId) => [
        { type: "ApplicationDetails", id: applicationId },
      ],
    }),
    getReviewStatuses: builder.query<
      { [applicationId: string]: { hasReview: boolean; isCompleted: boolean } },
      string[]
    >({
      async queryFn(applicationIds, queryApi, extraOptions) {
        const results: Record<string, { hasReview: boolean; isCompleted: boolean }> = {};

        for (const applicationId of applicationIds) {
          try {
            const result = await rawBaseQuery(
              { url: `reviews/${applicationId}`, method: "GET" },
              queryApi,
              extraOptions
            );

            if (result.data) {
              const data = result.data as ApplicationDetailsResponse;
              const hasReview = !!data.data.review_details;
              const isCompleted =
                hasReview &&
                (data.data.review_details!.resume_score > 0 ||
                  data.data.review_details!.essay_why_a2sv_score > 0 ||
                  data.data.review_details!.essay_about_you_score > 0 ||
                  data.data.review_details!.technical_interview_score > 0 ||
                  data.data.review_details!.behavioral_interview_score > 0);
              results[applicationId] = { hasReview, isCompleted };
            } else {
              results[applicationId] = { hasReview: false, isCompleted: false };
            }
          } catch (error) {
            console.error("Error fetching review status for", applicationId, error);
            results[applicationId] = { hasReview: false, isCompleted: false };
          }
        }

        return { data: results };
      },
      providesTags: (result, error, applicationIds) =>
        applicationIds.map((id) => ({ type: "ApplicationDetails" as const, id })),
    }),
    updateReview: builder.mutation<
      UpdateReviewResponse,
      { applicationId: string; reviewData: UpdateReviewRequest }
    >({
      query: ({ applicationId, reviewData }) => ({
        url: `reviews/${applicationId}`,
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { applicationId }) => [
        "AssignedReviews",
        { type: "ApplicationDetails", id: applicationId },
      ],
      async onQueryStarted({ applicationId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            reviewerApi.util.invalidateTags([
              { type: "ApplicationDetails", id: applicationId },
            ])
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetAssignedReviewsQuery,
  useGetApplicationDetailsQuery,
  useGetReviewStatusesQuery,
  useUpdateReviewMutation,
} = reviewerApi;
