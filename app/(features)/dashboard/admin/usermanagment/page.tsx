import AdminUser from "@/app/components/AdminUser";
import React from "react";
import Button from "@/app/components/Butt";
import UserTable from "@/app/components/AdminUser/UserTable.tsx/UserTable";

const UserManagment = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "joghn@2q4d.c",
      role: "Manager",
      status: "Active" as "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@a1sv.org",
      role: "Reviewer",
      status: "Inactive" as "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "",
      role: "Applicant",
      status: "Active" as "Active",
    },
  ];

  return (
    <AdminUser
      title="User Management"
      text="Administer and manage all users on the platform"
      actionButton={<Button text="Create New User" />}
    >
      <div className="flex gap-4 shadow-lg mb-6 bg-white rounded-lg p-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full border rounded-lg border-gray-200 p-2 text-sm outline-none focus:border-gray-400"
        />
        <button className="shrink-0 bg-indigo-100 px-8 py-2 rounded-lg hover:bg-indigo-300">
          All Roles
        </button>
      </div>

      <UserTable users={users} />
    </AdminUser>
  );
};

export default UserManagment;
