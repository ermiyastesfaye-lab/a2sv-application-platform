"use client";
import { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  useGetApplicationDetailsQuery,
  useUpdateReviewMutation,
} from "@/lib/redux/api/reviewerApi";
import ApplicationProfile from "@/app/components/reviewerDetail/ApplicationProfile";
import EvaluationForm from "@/app/components/reviewerDetail/EvaluationForm";


type FetchBaseQueryError = {
  status: number;
  data?: unknown;
};

const ReviewerDetails = () => {
  const router = useRouter();
  
  const params = useParams();
  const applicationId = params.id as string;
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const fromManager = searchParams.get("from") === "manager";
  const isReadOnly = mode === "view";

  const { data, isLoading, error, refetch } = useGetApplicationDetailsQuery(
    applicationId || "",
    { skip: !applicationId || applicationId === "[id]" }
  );
  const [updateReview] = useUpdateReviewMutation();

  useEffect(() => {
    if (error && "status" in error && (error as FetchBaseQueryError).status === 403) {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [error, router]);
  useEffect(() => {
    if (!data) return;
    
    const status = data.data.applicant_details?.status;
    const hasReview = !!data.data.review_details;
    
    if (status === "pending_review" && !hasReview) {
      (async () => {
        try {
          await updateReview({
            applicationId,
            reviewData: {
              activity_check_notes: "",
              resume_score: 0,
              essay_why_a2sv_score: 0,
              essay_about_you_score: 0,
              technical_interview_score: 0,
              behavioral_interview_score: 0,
              interview_notes: "",
            },
          }).unwrap();
          await refetch();
        } catch (e) {
          
        }
      })();
    }
  }, [data, applicationId, updateReview, refetch]);

  
  if (!applicationId || applicationId === "[id]") {
    return (
      <div className="min-h-screen bg-gray-100 mb-20">
        <div className="bg-[#1F2937] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <div className="text-sm">© 2025 A2SV. All rights reserved.</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="text-red-600">
              Error: Invalid application ID in the URL.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && "status" in error && (error as FetchBaseQueryError).status === 403) {
    return (
      <div className="min-h-screen bg-gray-100 mb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 mb-20">
        <div className="bg-[#1F2937] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <div className="text-sm">© 2025 A2SV. All rights reserved.</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 mb-20">
        <div className="bg-[#1F2937] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <div className="text-sm">© 2025 A2SV. All rights reserved.</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="text-red-600">
              Error loading application details. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mb-20">
      <div className="bg-[#1F2937] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/dashboard/reviewer"
              className="text-sm hover:text-gray-300 transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <div className="text-sm">© 2025 A2SV. All rights reserved.</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ApplicationProfile applicantDetails={data.data.applicant_details} />
          <EvaluationForm
            applicationId={applicationId}
            reviewDetails={data.data.review_details}
            readOnly={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewerDetails;