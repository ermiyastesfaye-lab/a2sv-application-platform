"use client";

import { TimelineItem } from "@/app/components/TimelineItem";
import { GoCheckCircle } from "react-icons/go";
import { GrFormSchedule } from "react-icons/gr";
import {
  useGetApplicationStatusQuery,
  useGetApplicationDetailsQuery,
  useSubmitApplicationMutation,
  useDeleteApplicationMutation,
} from "@/lib/redux/api/clientApi";
import React, { useState } from "react";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/components/LoadingPage";
import { useRouter } from "next/navigation";

interface StatusPageProps {
  status?: string;
}

const ApplicantStatusPage = ({ status: initialStatus }: StatusPageProps) => {
  const router = useRouter();
  const [mockStatus, setMockStatus] = useState("in_progress"); // Change this to test different statuses

  // Temporary mock data - replace with real API calls when ready
  const mockApplication = {
    id: "382db91c-270b-493f-902f-5f33694a4c2f",
    status: mockStatus,
    school: "Addis Ababa Science and Technology University",
    degree: "B.Sc. in Software Engineering",
    leetcode_handle: "Infinidrix",
    codeforces_handle: "Infinidrix",
    essay_why_a2sv:
      "I want to join A2SV to strengthen my skills in Data Structures and Algorithms...",
    essay_about_you:
      "I'm a dedicated software engineering student who loves solving problems...",
    resume_url: "https://example.com/resume.pdf",
    submitted_at:
      mockStatus !== "in_progress" ? "2023-10-26T00:00:00.000Z" : "",
    updated_at: "2023-10-28T00:00:00.000Z",
  };

  // Uncomment these when using real API
  /*
  const { data: statusResponse } = useGetApplicationStatusQuery();
  const applicationId = statusResponse?.data?.id;
  const { data: detailsResponse } = useGetApplicationDetailsQuery(applicationId!, {
    skip: !applicationId,
  });
  const [submitApplication] = useSubmitApplicationMutation();
  const [deleteApplication] = useDeleteApplicationMutation();
  */

  // For testing - use mock data instead of API
  const status = initialStatus || mockApplication.status;
  const applicationData = mockApplication; // Or detailsResponse?.data when using real API

 const getTimelineStages = (status: string) => ({
   isInProgress: {
     isCompleted: false,
     isCurrent: status === "in_progress",
   },
   isSubmitted: {
     isCompleted: ["under_review", "interview", "decision_made"].includes(
       status
     ),
     isCurrent: status === "submitted",
   },
   isUnderReview: {
     isCompleted: ["interview", "decision_made"].includes(status),
     isCurrent: status === "under_review",
   },
   isInterview: {
     isCompleted: status === "decision_made",
     isCurrent: status === "interview",
   },
   isDecisionMade: {
     isCompleted: false,
     isCurrent: status === "decision_made",
   },
 });


  // Mock handlers - replace with real API calls when ready
  const handleSubmit = () => {
    alert("Application submitted (mock)");
    setMockStatus("submitted");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?")) {
      alert("Application deleted (mock)");
      router.push("/dashboard/applicant");
    }
  };

  const handleEdit = () => {
    alert("Redirecting to edit page (mock)");
    // router.push(`/application/edit/${mockApplication.id}`);
  };

  const statusStages = getTimelineStages(status);

  return (
    <main className="md:w-4xl mx-auto p-4 text-[#0a0a0a] pb-40">
      {/* Debug Panel - Remove in production */}
      <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg z-50 border border-gray-200">
        <h4 className="font-bold mb-2 text-sm">TESTING MODE</h4>
        <div className="flex gap-2 flex-wrap">
          {[
            "in_progress",
            "submitted",
            "under_review",
            "interview",
            "decision_made",
          ].map((s) => (
            <button
              key={s}
              onClick={() => setMockStatus(s)}
              className={`px-3 py-1 text-xs rounded ${
                status === s ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-2">Your Application Progress</h1>
        <p className="text-gray-600 text-sm">
          You're on your way! Here's a summary of your application status
        </p>
      </div>

      <div className="md:grid md:grid-cols-6 gap-6">
        {/* Timeline Column */}
        <div className="col-span-4 bg-white rounded-lg p-5 max-h-110">
          <div className="space-y-2">
            <TimelineItem
              title="Application In Progress"
              description={
                <>
                  <p>We're currently processing your application...</p>
                  {status === "in_progress" && (
                    <div className="flex gap-3 my-2">
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-600 border border-red-400 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleEdit}
                        className="px-4 py-2 text-blue-600 border border-blue-400 rounded hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>
              }
              isCompleted={false}
              isCurrent={statusStages.isInProgress.isCurrent}
            />

            <TimelineItem
              title="Application Submitted"
              description="Your application has been successfully submitted. We're excited to learn more about you!"
              date={applicationData.submitted_at}
              isCompleted={statusStages.isSubmitted.isCompleted}
              isCurrent={statusStages.isSubmitted.isCurrent}
            />

            <TimelineItem
              title="Under Review"
              description="Our team is currently reviewing your application. This may take a few days. Thank you for your patience."
              isCompleted={statusStages.isUnderReview.isCompleted}
              isCurrent={statusStages.isUnderReview.isCurrent}
            />

            <TimelineItem
              title="Interview Stage"
              description="If selected, you'll be invited for an interview to further discuss your application."
              isCompleted={statusStages.isInterview.isCompleted}
              isCurrent={statusStages.isInterview.isCurrent}
            />

            <TimelineItem
              title="Decision Made"
              description="The final decision on your application will be communicated to you."
              isCompleted={statusStages.isDecisionMade.isCompleted}
              isCurrent={statusStages.isDecisionMade.isCurrent}
            />
          </div>
        </div>

        {/* Activity Column */}
        <div className="flex flex-col gap-4 col-span-2">
          <section className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
            <div className="text-gray-600 flex items-center gap-3">
              <GoCheckCircle size={25} className="text-green-600" />
              <div>
                <p>
                  Application{" "}
                  {status === "in_progress" ? "started" : "submitted"}
                </p>
                {status !== "in_progress" && (
                  <span className="text-sm">
                    {new Date(
                      applicationData.submitted_at
                    ).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {statusStages.isInterview && (
              <div className="text-gray-600 flex items-center gap-2 mt-3">
                <GrFormSchedule size={28} />
                <div>
                  <p>Interview Scheduled</p>
                  <span className="text-sm">
                    {new Date(applicationData.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-3">Important Updates</h3>
            <p className="text-gray-600 text-sm">
              {status === "decision_made"
                ? "Your application decision is ready! Check your email."
                : "There are no new updates at this time. We will notify you by email when your application status changes."}
            </p>
          </section>

          {status === "in_progress" && (
            <section className="p-3 rounded-lg shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">
                Your Application is in Progress
              </h3>
              <p className="text-sm mb-2">
                You've started your application – great job! Make sure to fill
                in all the required details.
              </p>
              <a href="#" className="text-[15px] underline text-blue-700">
                Go to application form →
              </a>
            </section>
          )}

          {status === "submitted" && (
            <section className="p-3 rounded-lg shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">Application Submitted</h3>
              <p className="text-sm mb-2">
                Thank you for submitting your application! The team will review
                it and notify you of the next steps.
              </p>
              <a href="#" className="text-[15px] underline text-green-700">
                Learn what happens next →
              </a>
            </section>
          )}

          {(status === "under_review" || status === "interview") && (
            <section className="p-3 rounded-lg shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">
                Get Ready for the{" "}
                {status === "interview" ? "Interview" : "Next Steps"}!
              </h3>
              <p className="text-sm mb-2">
                While you wait, it's a great time to prepare. Practice your
                problem-solving skills on platforms like LeetCode and
                Codeforces.
              </p>
              <a href="#" className="text-[15px] underline">
                Read our interview prep guide →
              </a>
            </section>
          )}

          {status === "decision_made" && (
            <section className="p-3 rounded-lg shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">Final Decision Made</h3>
              <p className="text-sm mb-2">
                The evaluation process is complete. Please check your email or
                dashboard for the final outcome.
              </p>
              <a href="#" className="text-[15px] underline text-gray-800">
                View your decision →
              </a>
            </section>
          )}
        </div>
      </div>
      {status === "in_progress" && (
        <div className="sticky bottom-6 mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200  shadow-sm">
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Delete
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ApplicantStatusPage;
