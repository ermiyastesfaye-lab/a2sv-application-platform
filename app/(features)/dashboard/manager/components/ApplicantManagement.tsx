import React, { JSX, useState } from "react";
import { ChevronLeftIcon } from "./Icons";
import { Card, CardContent } from "./Card";
import {
  useAssignReviewerMutation,
  useDecideApplicationMutation,
  useGetApplicantByIdQuery,
  useGetReviewersQuery,
} from "@/lib/redux/api/managerApi";
import { ParamValue } from "next/dist/server/request/params";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";

export const ApplicantManagement = ({
  id,
}: {
  id: ParamValue;
}): JSX.Element => {
  const { data, isLoading, isError} = useGetApplicantByIdQuery({
    application_id: id,
  });
  const {
    data: reviewersData,
    isLoading: reviewersLoading,
    isError: reviewersError,
  } = useGetReviewersQuery({ page: 1, limit: 10 });
  const [assignReviewer, { isLoading: isAssigning }] =
    useAssignReviewerMutation();
  const [
    decideApplication,
    {  },
  ] = useDecideApplicationMutation();
  const [decisionNotes] = useState("s");

  const router = useRouter();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError || !data?.data?.application) {
    return <div className="p-8 text-red-500">Error loading application.</div>;
  }

  const application = data.data.application;
  const review = data.data.review;

  const handleReviewerAssignment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const reviewerId = form.reviewer.value;
    try {
      if (reviewerId) {
        await assignReviewer({
          application_id: id,
          reviewer_id: reviewerId,
        });
      }
      router.push("/dashboard/manager");
    } catch (error) {
      console.error("Failed to assign reviewer", error);
    }
  };

  const handleReject = async () => {
    try {
      await decideApplication({
        status: "rejected",
        decision_notes: decisionNotes,
        application_id: id,
      });
      alert("Application rejected successfully!");
      router.push("/dashboard/manager");
    } catch (e) {
      console.log("Error deciding on application", e);
    }
  };

  const handleConfirm = async () => {
    try {
      await decideApplication({
        status: "accepted",
        decision_notes: decisionNotes,
        application_id: id,
      });
      alert("Application accepted successfully!");
      router.push("/dashboard/manager");
    } catch (e) {
      console.log("Error deciding on application", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div
              className="flex items-center gap-2 mb-2"
              onClick={() => router.push("/dashboard/manager")}
            >
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              <button className="text-sm text-gray-600">
                Back to Dashboard
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Manage: {application.applicant_name}
            </h1>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Applicant Profile */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Applicant Profile
                </h2>

                {/* School and Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      School
                    </h3>
                    <p className="text-gray-900">{application.school}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Degree Program
                    </h3>
                    <p className="text-gray-900">{application.degree}</p>
                  </div>
                </div>

                {/* Coding Profiles */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Coding Profiles
                  </h3>
                  <div className="flex gap-4">
                    {application.leetcode_handle && (
                      <a
                        href={`https://leetcode.com/${application.leetcode_handle}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LeetCode
                      </a>
                    )}
                    {application.codeforces_handle && (
                      <a
                        href={`https://codeforces.com/profile/${application.codeforces_handle}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Codeforces
                      </a>
                    )}
                  </div>
                </div>

                {/* Essays */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay 1: Tell us about yourself
                    </h3>
                    <p className="text-gray-900">
                      {application.essay_about_you}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay 2: Why do you want to join us?
                    </h3>
                    <p className="text-gray-900">
                      {application.essay_why_a2sv}
                    </p>
                  </div>
                </div>

                {/* Resume */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </h3>
                  {application.resume_url ? (
                    <a
                      href={application.resume_url}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500">No resume uploaded</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reviewer's Feedback */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Reviewer&apos;s Feedback
                </h2>

                {/* Activity Check */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Activity Check
                  </h3>
                  <p className="text-gray-900">
                    {review?.activity_check_notes || "No activity check notes."}
                  </p>
                </div>

                {/* Scores Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Resume Score
                    </h3>
                    <p className="text-gray-900">
                      {review?.resume_score ?? "-"}/100
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay (Why A2SV) Score
                    </h3>
                    <p className="text-gray-900">
                      {review?.essay_why_a2sv_score ?? "-"}/100
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay (About You) Score
                    </h3>
                    <p className="text-gray-900">
                      {review?.essay_about_you_score ?? "-"}/100
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Tech Interview
                    </h3>
                    <p className="text-gray-900">
                      {review?.technical_interview_score ?? "-"}/100
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Behavioral
                    </h3>
                    <p className="text-gray-900">
                      {review?.behavioral_interview_score ?? "-"}/100
                    </p>
                  </div>
                </div>

                {/* Interviewer Notes */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Interviewer Notes
                  </h3>
                  <p className="text-gray-900">
                    {review?.interview_notes || "No notes provided."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Manager Actions */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Manager Actions
                </h2>

                {/* Assign Reviewer */}
                {application.status === "submitted" && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Assign Reviewer
                    </h3>
                    <form onSubmit={handleReviewerAssignment}>
                      <select
                        name="reviewer"
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          {reviewersLoading
                            ? "Loading reviewers..."
                            : reviewersError
                            ? "Failed to load reviewers"
                            : "Select a reviewer"}
                        </option>
                        {reviewersData?.data?.reviewers?.map((reviewer) => (
                          <option key={reviewer.id} value={reviewer.id}>
                            {reviewer.full_name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        disabled={isAssigning}
                      >
                        {isAssigning ? "Assigning..." : "Assign"}
                      </button>
                    </form>
                  </div>
                )}

                {application.status != "accepted" &&
                application.status != "rejected" ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Final Decision
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This action is final and will notify the applicant.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleReject}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-semibold text-gray-900">
                    Status:{" "}
                    <span
                      className={
                        application.status === "accepted"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {application.status}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
