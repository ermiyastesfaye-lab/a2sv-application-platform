import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
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
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="px-4 py-3 flex items-center gap-3">
                <img
                  src="/avatar-placeholder.png"
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
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
                    user.status === "Active"
                      ? "bg-blue-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="px-4 py-3 text-center space-x-3">
                <button className="text-indigo-600 hover:underline text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:underline text-sm">
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
