"use client";
import { useDeleteUserMutation } from "@/lib/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();
  const [deleteUser] = useDeleteUserMutation();
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  const handleDelete = async (id: string|number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (!confirmDelete) return;
    try {
      const response = await deleteUser(id);
      console.log(response);
      setDisplayedUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      alert("Failed to Delete User");
      console.error("Failed to Delete User", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left shadow-xl bg-white rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="px-4 py-3 flex items-center gap-3">
                <Image
                width={100} height={100}
                  src="/profile-set-avatar-img.png"

                  alt={user.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                  
                />
                <div>
                  <div className="font-medium">{user.full_name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>

              <td className="px-4 py-3">
                <span className="text-gray-500 px-2 py-1 rounded font-medium">
                  {user.role}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.is_active
                      ? "bg-blue-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-3 text-center space-x-3">
                <button
                  className="text-indigo-600 hover:underline text-sm"
                  onClick={() =>
                    router.push(`/dashboard/admin/edituser?id=${user.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
