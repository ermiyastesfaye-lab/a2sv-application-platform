"use client";
import AdminUser from "@/app/components/AdminUser";
import InputBox from "@/app/components/AdminUser/InputBox/InputBox";
import ComboBox from "@/app/components/AdminUser/ComboBox/ComboBox";
import React, { useState } from "react";

const EditUser = () => {
  const [user, setUser] = useState({
    fullName: "Jane Reviewer",
    email: "jane@a2sv.org",
    password: "dummy-password",
    role: "reviewer",
  });

  return (
    <AdminUser
      title={`Edit User: ${user.fullName}`}
      text="Use this form to update the user's information and role"
    >
      <div className="bg-white shadow-sm rounded-lg p-6 my-10">
        <div className="flex gap-8">
          <InputBox
            title="Full name"
            placeholder="Full name"
            value={user.fullName}
          />
          <InputBox
            title="Email address"
            type="email"
            placeholder="Email address"
            value={user.email}
          />
        </div>
        <div className="flex gap-8">
          <InputBox
            title="Password"
            type="password"
            placeholder="Set a new password"
            value={user.password}
          />
          <ComboBox
            label="Role"
            value={user.role}
            options={[
              { value: "applicant", label: "Applicant" },
              { value: "reviewer", label: "Reviewer" },
              { value: "manager", label: "Manager" },
            ]}
          />
        </div>
      </div>
    </AdminUser>
  );
};

export default EditUser;
