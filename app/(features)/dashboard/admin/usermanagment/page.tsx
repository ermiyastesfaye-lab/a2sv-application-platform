"use client";
import AdminUser from "@/app/components/AdminUser";
import Button from "@/app/components/Butt";
import UserTable from "@/app/components/AdminUser/UserTable.tsx/UserTable";
import {
  useGetAllUserNoFilterQuery,
  useGetAllUsersQuery,
} from "@/lib/redux/slices/adminSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import PaginationControls from "@/app/components/ApplicationCycles/PaginationControls";
import LoadingPage from "@/app/components/LoadingPage";
import ErrorPage from "../../applicant/components/ErrorPage";

const UserManagment = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const roles = ["All Roles", "Admin", "Reviewer", "Manager"];
  const [page, setCurrentPage] = useState(1);
  const limit = 5;
  const {
    data: allUsersData,
    isLoading,
    isError,
  } = useGetAllUserNoFilterQuery({
    page: 1,
    limit: 100,
  });
  const allUsers = allUsersData?.data.users || [];

  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState("");

  useEffect(() => {
    if (
      searchParams.get("success") === "user-created" ||
      searchParams.get("success") === "user-updated"
    ) {
      setShowSuccess(searchParams.get("success") || "");

      const timeout = setTimeout(() => {
        setShowSuccess("");
        router.replace("/dashboard/admin/usermanagment");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user: any) => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        role === "All Roles"
          ? true
          : user.role.toLowerCase() === role.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [allUsers, search, role]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  }, [filteredUsers, page, limit]);
  const totalPages = Math.ceil(filteredUsers.length / limit);

  // console.log(allUsers);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isError) return <ErrorPage />;
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
      {" "}
      {showSuccess && (
        <div className="fixed top-5  right-5 z-50 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg transition-all">
          User {showSuccess === "user-created" ? "created" : "updated"}{" "}
          successfully
        </div>
      )}
      <div className="flex gap-4 shadow-lg mb-6 bg-white rounded-lg p-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={handleSearchChange}
          className="w-full border rounded-lg border-gray-200 p-2 text-sm outline-none focus:border-gray-400"
        />
        <select
          value={role}
          onChange={handleRoleChange}
          className="shrink-0 bg-indigo-100 px-4 py-2 rounded-lg outline-none"
        >
          {roles.map((r) => (
            <option
              className="bg-white outline-none hover:bg-indigo-100"
              key={r}
              value={r}
            >
              {r}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? <LoadingPage /> : <UserTable users={paginatedUsers} />}
      <PaginationControls
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </AdminUser>
  );
};

export default UserManagment;
