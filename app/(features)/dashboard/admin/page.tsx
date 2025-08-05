import Link from "next/link";
import React from "react";

const AdminDashboard = () => {
  return (
    <main className="md:w-4xl mx-auto mt-3 p-4 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Admin Command Center</h1>
      <div className="md:grid md:grid-cols-3 gap-4">
        <section className="flex flex-col gap-4">
          {/* total users number*/}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Total Users</p>
            <span className="text-lg font-semibold">125</span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Manage Users</h3>
            <p className="text-gray-600 text-sm">
              Create, edit, and manage user accounts and roles
            </p>

            <Link
              href="#"
              className="text-indigo-600 text-sm hover:text-indigo-900"
            >
              Go to Users →
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4 ">
          {/* total users number*/}
          <div className="bg-green-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Total Applicant (G7)</p>
            <span className="text-lg font-semibold">1,204</span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Manage Cycles</h3>
            <p className="text-gray-600 text-sm">
              Create and manage application Cycles
            </p>

            <Link
              href="#"
              className="text-indigo-600 text-sm hover:text-indigo-900"
            >
              Go to Cycles →
            </Link>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="bg-amber-500 rounded-lg p-4 text-white shadow-lg">
            <p className="text-sm">Active Cycles</p>
            <span className="text-lg font-semibold">1</span>
          </div>
          <div className="bg-white rounded p-4 min-h-60 shadow-lg">
            <h3 className="font-bold text-lg mb-3">Recent Admin Activities</h3>
            <ul>
              {/* list recent activities here */}
              <div className="text-gray-600 flex items-center gap-3 text-sm">
                <span>logo</span>
                <div>
                  <p>put actions like user created here</p>
                  <span>time</span>
                </div>
              </div>
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
          href="#"
          className="text-indigo-600 text-sm hover:text-indigo-900"
        >
          Go to Analytics →
        </Link>
      </div>
    </main>
  );
};

export default AdminDashboard;
