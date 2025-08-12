"use client";
import { TimelineItem } from "@/app/components/TimelineItem";
import { GoCheckCircle } from "react-icons/go";
import {
  useGetApplicationStatusQuery,
  useGetApplicationDetailsQuery,
} from "@/lib/redux/api/clientApi";
import React from "react";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/components/LoadingPage";
import { InProgressActionButtons } from "./ActionButtons";
import Link from "next/link";

interface StatusPageProps {
  status?: string;
}

const ApplicantStatusPage = ({ status: initialStatus }: StatusPageProps) => {
  const {
    data: statusResponse,
    isLoading: statusLoading,
    error: statusError,
  } = useGetApplicationStatusQuery();

  const applicationId = statusResponse?.data?.id;
  const {
    data: detailsResponse,
    isLoading: detailsLoading,
    error: detailsError,
  } = useGetApplicationDetailsQuery(applicationId!, {
    skip: !applicationId,
  });

  const status = initialStatus || statusResponse?.data?.status || "not_started";
  const applicationData = detailsResponse?.data || statusResponse?.data;
 


  const getTimelineStages = (status: string) => ({
    isInProgress: {
      isCompleted: [
        "submitted",
        "pending_review",
        "accepted",
        "rejected",
      ].includes(status),
      isCurrent: status === "in_progress",
    },
    isSubmitted: {
      isCompleted: ["pending_review", "accepted", "rejected"].includes(status),
      isCurrent: status === "submitted",
    },
    isUnderReview: {
      isCompleted: ["accepted", "rejected"].includes(status),
      isCurrent: status === "pending_review",
    },
      // isInterview: {
      //   isCompleted: status === "decision_made",
      //   isCurrent: status === "interview",
      // },
    isDecisionMade: {
      isCompleted: false,
      isCurrent: ["accepted", "rejected"].includes(status),
    },
  });


  if (statusLoading || detailsLoading) return <LoadingPage />;
  if (statusError || detailsError) return <ErrorPage />;
  if (!applicationData)
    return (
      <div className="text-center mt-40 text-gray-600">
        <p className="mb-4">No application found</p>
        <Link
          href="/application"
          className="text-indigo-600 underline font-medium"
        >
          Start a new application →
        </Link>
      </div>
    );

  const statusStages = getTimelineStages(status);

  return (
    <main className="md:w-4xl mx-auto mt-2 p-5 text-[#0a0a0a] pb-40">
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-2">Your Application Progress</h1>
        <p className="text-gray-600 text-sm">
          You&apos;re on your way! Here&apos;s a summary of your application status
        </p>
      </div>

      <div className="md:grid md:grid-cols-6 gap-6">
        <div className="col-span-4 bg-white rounded-lg p-7 h-fit shadow-lg">
          <div className="space-y-3">
            <TimelineItem
              title="Application In Progress"
              description={
                <>
                  <p>We&apos;re currently processing your application...</p>
                  {status === "in_progress" && (
                    <InProgressActionButtons applicationId={applicationId!} />
                  )}
                </>
              }
              isCompleted={statusStages.isInProgress.isCompleted}
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

            {/* <TimelineItem
              title="Interview Stage"
              description="If selected, you'll be invited for an interview to further discuss your application."
              isCompleted={statusStages.isInterview.isCompleted}
              isCurrent={statusStages.isInterview.isCurrent}
            /> */}
            <TimelineItem
              title="Final Decision"
              description={
                status === "accepted"
                  ? "Congratulations! You’ve been accepted."
                  : status === "rejected"
                  ? "We regret to inform you that your application was not successful."
                  : "Final decision will be communicated soon."
              }
              isCompleted={["accepted", "rejected"].includes(status)}
              isCurrent={["accepted", "rejected"].includes(status)}
            />
          </div>
        </div>

        {/* Activity Column */}
        <div className="flex flex-col gap-4 col-span-2">
          <section className="bg-white p-5 rounded shadow-lg">
            <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
            <div className="text-gray-600 flex items-center gap-3">
              <GoCheckCircle size={25} className="text-green-600" />
              <div>
                <p>Application submitted</p>
                <span className="text-sm">
                  {new Date(applicationData.submitted_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* {statusStages.isInterview && (
              <div className="text-gray-600 flex items-center gap-2 mt-3">
                <GrFormSchedule size={28} />
                <div>
                  <p>Interview Scheduled</p>
                  <span className="text-sm">
                    {detailsResponse?.data &&
                      new Date(
                        detailsResponse?.data?.updated_at
                      ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )} */}
          </section>

          <section className="bg-white p-5 rounded shadow-lg">
            <h3 className="font-bold text-lg mb-3">Important Updates</h3>
            <p className="text-gray-600 text-sm">
              {status === "decision_made"
                ? "Your application decision is ready! Check your email."
                : "There are no new updates at this time. We will notify you by email when your application status changes."}
            </p>
          </section>

          {status === "in_progress" && (
            <section className="p-5 rounded shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">
                Your Application is in Progress
              </h3>
              <p className="text-sm mb-2">
                You&apos;ve started your application – great job! Make sure to fill
                in all the required details.
              </p>
              <a
                href="/application"
                className="text-[15px] underline text-white"
              >
                Go to application form →
              </a>
            </section>
          )}

          {status === "submitted" && (
            <section className="p-5 rounded shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">Application Started</h3>
              <p className="text-sm mb-2">
                Thank you for submitting your application! The team will review
                it and notify you of the next steps.
              </p>
              <Link href="#" className="text-[15px] underline text-white">
                Learn what happens next →
              </Link>
            </section>
          )}

          {(status === "pending_review" || status === "interview") && (
            <section className="p-5 rounded shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">
                Get Ready for the{" "}
                {status === "interview" ? "Interview" : "Next Steps"}!
              </h3>
              <p className="text-sm mb-2">
                While you wait, it&apos;s a great time to prepare. Practice your
                problem-solving skills on platforms like LeetCode and
                Codeforces.
              </p>
              <Link href="#" className="text-[15px]">
                Read our interview prep guide →
              </Link>
            </section>
          )}

          {status === "accepted" || status === "rejected" ? (
            <section className="p-5 rounded shadow-lg bg-indigo-700 text-white">
              <h3 className="font-bold text-lg mb-3">Final Decision Made</h3>
              <p className="text-white text-sm">
                {status === "accepted"
                  ? "Your application has been accepted! Check your email for the next steps."
                  : "Your application was not successful. Thank you for applying."}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ApplicantStatusPage;
