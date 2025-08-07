"use client";
import AdminUser from "@/app/components/AdminUser";
import React from "react";
import Button from "@/app/components/Butt";
import UserTable from "@/app/components/AdminUser/UserTable.tsx/UserTable";
import { useGetAllUsersQuery } from "@/lib/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginationControls from "@/app/components/ApplicationCycles/PaginationControls";

const UserManagment = () => {
  const [page, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: page,
    limit: limit,
  });
  const users = data?.data.users || [];
  const totalCount = data?.data.total_count || 0;
  // console.log(data?.data);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalCount / limit)) {
      setCurrentPage(page);
    }
  };

  const router = useRouter();

  return (
    <AdminUser
      title="User Management"
      text="Administer and manage all users on the platform"
      actionButton={
        <Button
          text="Create New User"
          onclick={() => router.push("/dashboard/admin/createuser")}
        />
      }
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

      {users && <UserTable users={users} />}
      <PaginationControls
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(totalCount / limit)}
      />
    </AdminUser>
  );
};

export default UserManagment;
