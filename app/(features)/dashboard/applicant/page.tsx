"use client";

import Link from "next/link";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";

type ChecklistItem = {
  label: string;
  completed: boolean;
};

type DashboardProps = {
  userName: string;
  profileCompletion: number;
  checklist: ChecklistItem[];
  applicationCycle: string;
};

const ApplicationDashboard = ({
  userName = "John",
  profileCompletion = 75,
  checklist = [
    { label: "Create an Account", completed: true },
    { label: "Fill Personal information", completed: true },
    { label: "Submit Coding Profiles", completed: false },
    { label: "Write Essays", completed: false },
    { label: "Upload Resume", completed: false },
  ],
  applicationCycle = "G7 November Intake",
}: DashboardProps) => {
  return (
    <main className="md:w-4xl mx-auto mt-3 p-4">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl">Welcome, {userName}!</h1>
        <p className="text-gray-600 text-sm">
          Your Journey to a global tech career starts now.
        </p>
      </div>

      {/* Main Grid */}
      <div className="md:grid md:grid-cols-6 gap-6">
        {/* Application Banner */}
        <div className="col-span-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 rounded-lg shadow md:max-h-48 mb-3">
          <h2 className="text-2xl font-bold mb-2">{applicationCycle}</h2>
          <p className="text-sm mb-4">
            It's time to submit your application and show us your potential
          </p>
          <button className="bg-white py-2 px-4 text-indigo-800 rounded font-semibold hover:bg-gray-200 text-[15px]">
            Start Application
          </button>
        </div>

        {/* Right Column: Profile & Checklist */}
        <div className="flex flex-col gap-4 col-span-2">
          {/* Profile Completion */}
          <section className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-3">Complete Your Profile</h3>
            <span className="text-sm text-gray-700 bg-indigo-200 rounded-full px-2">
              {profileCompletion}% COMPLETE
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2 my-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <Link
              href="#"
              className="text-indigo-600 text-sm hover:text-indigo-900"
            >
              Go to profile →
            </Link>
          </section>

          {/* Application Checklist */}
          <section className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-3">Application Checklist</h3>
            <ul className="text-sm text-gray-500 flex flex-col gap-2">
              {checklist.map((item, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <CiCircleCheck
                    className={
                      item.completed ? "text-green-500" : "text-gray-400"
                    }
                  />
                  <span className={item.completed ? "line-through" : ""}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section className="bg-white p-5 rounded-lg shadow-lg mb-24">
            <h3 className="font-bold text-lg mb-3">Helpful Resources</h3>
            <div className="flex flex-col gap-1">
              <Link
                href="#"
                className="text-indigo-600 text-sm hover:text-indigo-900"
              >
                Tips for a Great Application
              </Link>
              <Link
                href="#"
                className="text-indigo-600 text-sm hover:text-indigo-900"
              >
                A2SV Problem Solving Guide
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ApplicationDashboard;
