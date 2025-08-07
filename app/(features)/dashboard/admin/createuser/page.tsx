import AdminUser from "@/app/components/AdminUser";
import InputBox from "@/app/components/AdminUser/InputBox/InputBox";
import React from "react";
import ComboBox from "@/app/components/AdminUser/ComboBox/ComboBox";

const CreateUser = () => {
  return (
    <AdminUser
      title="Create User"
      text="Use this form to create a new user and assign them a role"
    >
      <div className="bg-white shadow-sm rounded-lg p-6 my-10">
        <div className="flex gap-8 ">
          <InputBox title="Full name" />
          <InputBox title="Email address" type="email" />
        </div>
        <div className="flex gap-8 ">
          <InputBox
            title="Password"
            type="password"
            placeholder="Set an intial password"
          />
          <ComboBox
            label="Role"
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

export default CreateUser;
