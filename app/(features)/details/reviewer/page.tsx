"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApplicationProfile from "@/app/components/reviewerDetail/ApplicationProfile";
import EvaluationForm from "@/app/components/reviewerDetail/EvaluationForm";

const ReviewerDetails = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 mb-20">
      {/* Copyright at top */}
      <div className="bg-[#1F2937] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="text-sm">© 2025 A2SV. All rights reserved.</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard link and title */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link
                href="/dashboard/reviewer"
                className="text-gray-600 hover:text-blue-800 flex"
              >
                <svg
                  className="w-4 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Jana Reviewer</span>
              <Link
                href="/logout"
                className="text-gray-600 hover:text-blue-800"
              >
                Logout
              </Link>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Review: Abel Tadesse
          </h1>
        </div>

        {/* Cards side by side starting at equal line */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          {/* Left Section - Application Profile */}
          <div className="flex-1">
            <ApplicationProfile />
          </div>

          {/* Right Section - Evaluation Form */}
          <div className="flex-1">
            <EvaluationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDetails;
