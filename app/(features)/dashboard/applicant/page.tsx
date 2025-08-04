import Link from "next/link";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";

const ApplicationDashboard = () => {
  return (
    <>
      {/* header */}
      <main className="md:w-4xl mx-auto mt-5 p-4">
        <div className="mb-6">
          <h1 className="font-bold text-2xl">Welcome, John!</h1>
          <p className="text-gray-600 text-sm">
            Your Journey to a global tech career starts now.
          </p>
        </div>
        <div className="md:grid md:grid-cols-6 gap-6">
          <div className="col-span-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 rounded-lg shadow md:max-h-48 mb-3">
            <h2 className="text-2xl font-bold mb-2">G7 November Intake</h2>
            <p className="text-sm mb-4">
              It's time to submit your application and show us your potential
            </p>
            <button className="bg-white p-2 text-indigo-800 rounded font-semibold hover:bg-gray-200">
              Start Application
            </button>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <section className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-3">Complete Your Profile</h3>
              <span className="text-sm text-gray-700 bg-indigo-200 rounded-full px-2 py-1">
                {75}% COMPLETE
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${75}%` }}
                ></div>
              </div>
              <Link
                href="#"
                className="text-indigo-600 text-sm hover:text-indigo-900"
              >
                Go to profile →
              </Link>
            </section>
            <section className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-3">Application Checklist</h3>
              <ul className="text-sm text-gray-500">
                <li className="flex gap-2 align-middle">
                  <CiCircleCheck /> <span>Create an Account</span>
                </li>
                <li className="flex gap-2">
                  <CiCircleCheck /> <span>Fill Personal information</span>
                </li>
                <li className="flex gap-2">
                  <CiCircleCheck />
                  <span> Submit Coding Profiles</span>
                </li>
                <li className="flex gap-2">
                  <CiCircleCheck /> <span>Write Essays</span>
                </li>
                <li className="flex gap-2">
                  <CiCircleCheck /> <span>Upload Resume</span>
                </li>
              </ul>
            </section>
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
                  A2sv Problem Solving Guide
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* footer */}
    </>
  );
};

export default ApplicationDashboard;
