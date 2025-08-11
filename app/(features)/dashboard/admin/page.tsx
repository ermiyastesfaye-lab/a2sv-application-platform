"use client";
import Link from "next/link";
import React from "react";
import {
  useGetAllUsersQuery,
  useGetAnalyticesQuery,
} from "@/lib/redux/slices/adminSlice";

import { useGetActiveCyclesQuery } from "@/lib/redux/api/applicationCyclesApi";

const AdminDashboard = () => {
  const totalApplicants = 1204;
  const activeCycles = 1;
  const recentActivities = [
    {
      action: "User Abebe Kebede created",
      timestamp: "2025-08-01T10:00:00Z",
    },
    {
      action: "Cycle G7 In-Person Education Intake activated",
      timestamp: "2025-08-03T15:30:00Z",
    },
  ];

  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: 1,
    limit: 5,
  });

  const {
    data: totalApplicant,
    isLoading: isLoadingApplicant,
    isError: isErrorApplicant,
  } = useGetAnalyticesQuery({});

  const {
    data: totalActiveCycles,
    isLoading: isLoadingActiveCycles,
    isError: isErrorActiveCycles,
  } = useGetActiveCyclesQuery({});

  return (
    <main className="md:w-4xl mx-auto mt-3 p-4 flex flex-col gap-4 text-[#0a0a0a]">
      <h1 className="font-bold text-2xl">Admin Command Center</h1>
      <div className="md:grid md:grid-cols-3 gap-4">
        <section className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Total Users</p>
            <span className="text-lg font-semibold">
              {isLoading
                ? "Loading..."
                : isError
                ? "Failed to load"
                : data?.data?.total_count ?? 0}
            </span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Manage Users</h3>
            <p className="text-gray-600 text-sm">
              Create, edit, and manage user accounts and roles
            </p>

            <Link
              href="/dashboard/admin/usermanagment"
              className="text-indigo-600 text-sm hover:text-indigo-900"
            >
              Go to Users →
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4 ">
          <div className="bg-green-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Total Applicants (G7)</p>
            <span className="text-lg font-semibold">
              {isLoadingApplicant
                ? "Loading..."
                : isErrorApplicant
                ? "Failed to load"
                : totalApplicant?.data?.total_applicants ?? 0}
            </span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Manage Cycles</h3>
            <p className="text-gray-600 text-sm">
              Create and manage application cycles
            </p>

            <Link
              href="/dashboard/admin/applicationCycle"
              className="text-indigo-600 text-sm hover:text-indigo-900"
            >
              Go to Cycles →
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="bg-amber-500 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Active Cycles</p>
            <span className="text-lg font-semibold">
              {isLoadingActiveCycles
                ? "Loading..."
                : isErrorActiveCycles
                ? "Failed to load"
                : totalActiveCycles?.data?.total_count ?? 0}
            </span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Recent Admin Activities</h3>
            <ul className="space-y-2">
              {recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="text-gray-600 text-sm flex gap-3 items-start"
                >
                  <span>{/* image for the action */}</span>
                  <div>
                    <p>{activity.action}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="bg-white rounded p-4 md:w-lg mx-auto mb-30 shadow-lg">
        <h3 className="font-bold text-lg mb-3">View Analytics</h3>
        <p className="text-gray-600 text-sm">
          Explore application data and platform insights.
        </p>
        <Link
          href="/analytics"
          className="text-indigo-600 text-sm hover:text-indigo-900"
        >
          Go to Analytics →
        </Link>
      </div>
    </main>
  );
};

export default AdminDashboard;
