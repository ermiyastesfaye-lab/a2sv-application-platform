import React, { JSX } from "react";
import { ChevronLeftIcon } from "./Icons";
import { Card, CardContent } from "./Card";

export const ApplicantManagement = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Back to Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage: Abel Tadesse
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
                    <p className="text-gray-900">
                      Addis Ababa Institute of Technology
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Degree Program
                    </h3>
                    <p className="text-gray-900">Software Engineering</p>
                  </div>
                </div>

                {/* Coding Profiles */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Coding Profiles
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      LeetCode
                    </a>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Codeforces
                    </a>
                  </div>
                </div>

                {/* Essays */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay 1: Tell us about your self?
                    </h3>
                    <p className="text-gray-900">
                      I am passionate about solving complex problems.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay 2: Why do you want to join us?
                    </h3>
                    <p className="text-gray-900">
                      I want to join because I am sure it will help me to
                      improve my problem solving skill.
                    </p>
                  </div>
                </div>

                {/* Resume */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </h3>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View Resume.pdf
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Reviewer's Feedback */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Reviewer's Feedback (Jane R.)
                </h2>

                {/* Activity Check */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Activity Check
                  </h3>
                  <p className="text-gray-900">
                    Pass - 50 LC, 35 CF, 30 days active
                  </p>
                </div>

                {/* Scores Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Resume Score
                    </h3>
                    <p className="text-gray-900">95/100</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Essay Score
                    </h3>
                    <p className="text-gray-900">90/100</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Tech Interview
                    </h3>
                    <p className="text-gray-900">88/100</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Behavioral
                    </h3>
                    <p className="text-gray-900">92/100</p>
                  </div>
                </div>

                {/* Interviewer Notes */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Interviewer Notes
                  </h3>
                  <p className="text-gray-900">
                    Strong candidate with excellent problem-solving skills.
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
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Assign Reviewer
                  </h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-3">
                    <span className="text-gray-900">Jane R.</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Confirm
                  </button>
                </div>

                {/* Final Decision */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Final Decision
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This action is final and will notify the applicant.
                  </p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Accept
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
