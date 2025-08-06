import { TimelineItem } from "@/app/components/TimelineItem";
import { GoCheckCircle } from "react-icons/go";
import { GrFormSchedule } from "react-icons/gr";
import React from "react";

const ApplicantStatusPage = () => {
  const applicationData = {
    id: "382db91c-270b-493f-902f-5f33694a4c2f",
    status: "in_progress",
    school: "Addis Ababa Science and Technology University",
    degree: "Computer Science",
    submitted_at: "2023-10-26T00:00:00.000Z",
    updated_at: "2023-10-28T00:00:00.000Z",
  };

  

  const status = applicationData.status;
  const getTimelineStages = (status: string) => ({
    isSubmitted: [
      "in_progress",
      "under_review",
      "interview",
      "decision_made",
    ].includes(status),
    isUnderReview: ["under_review", "interview", "decision_made"].includes(
      status
    ),
    isInterview: ["interview", "decision_made"].includes(status),
    isDecisionMade: status === "decision_made",
  });

  const statusStages = getTimelineStages(status);

  return (
    <>
      <main className="md:w-4xl mx-auto mt-5 p-4 text-[#0a0a0a]">
        <div className="mb-6">
          <h1 className="font-bold text-2xl mb-2">Your Application Progress</h1>
          <p className="text-gray-600 text-sm">
            you're on your way! Here's a summary of your application status
          </p>
        </div>
        <div className="md:grid md:grid-cols-6 gap-6">
          <div className="col-span-4 bg-white rounded-lg p-8 max-h-110">
            <div className="space-y-6">
              <TimelineItem
                title="Application Submitted"
                description="Your application has been successfully submitted. We're excited to learn more about you!"
                date={applicationData.submitted_at}
                isCompleted={statusStages.isSubmitted}
                isCurrent={status === "in_progress"}
              />

              <TimelineItem
                title="Under Review"
                description="Our team is currently reviewing your application. This may take a few days. Thank you for your patience."
                isCompleted={statusStages.isUnderReview}
                isCurrent={status === "under_review"}
              />

              <TimelineItem
                title="Interview Stage"
                description="If selected, you'll be invited for an interview to further discuss your application."
                isCompleted={statusStages.isInterview}
                isCurrent={status === "interview"}
              />

              <TimelineItem
                title="Decision Made"
                description="The final decision on your application will be communicated to you."
                isCompleted={statusStages.isDecisionMade}
                isCurrent={status === "decision_made"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            <section className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-3">Recent Activitiy</h3>
              <div className="text-gray-600 flex items-center gap-3">
                <span>
                  <GoCheckCircle size={25} className=" text-green-600" />
                </span>
                <div>
                  <p>application submitted</p>
                  {/* submitted date */}
                  <span className="text-sm">some date</span>
                </div>
              </div>

              <div className="text-gray-600 flex items-center gap-2">
                <span>
                  <GrFormSchedule size={28} />
                </span>
                <div className="text-gray-600">
                  <p>Interview Scheduled</p>
                  {/* interview date */}
                  <span className="text-sm">some date</span>
                </div>
              </div>
            </section>
            <section className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-3">Important Updates</h3>

              <p className="text-gray-600 text-sm">
                There are no new updates at this time.we will notify you by
                email when your application status changes.
              </p>
            </section>
            <section className="p-5 rounded-lg shadow-lg bg-indigo-700 text-white mb-24">
              <h3 className="font-bold text-lg mb-3">
                Get Ready for the Interview!
              </h3>
              <p className="text-sm mb-2">
                When you wait, it's a great time to prepare Practice your
                problem-solving skills as platforms like LeetCode and Codeforces
              </p>
              <a href="#" className="text-[15px]">
                Read our interview prep guide →
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ApplicantStatusPage;
