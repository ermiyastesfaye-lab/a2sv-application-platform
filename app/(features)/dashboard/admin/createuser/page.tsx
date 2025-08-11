"use client";
import AdminUser from "@/app/components/AdminUser";
import InputBox from "@/app/components/AdminUser/InputBox/InputBox";
import React, { useState } from "react";
import ComboBox from "@/app/components/AdminUser/ComboBox/ComboBox";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "@/lib/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

const CreateUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createUser] = useCreateUserMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      console.log("Form data:", data);
      const response = await createUser(data).unwrap();
      console.log("User created successfully:", response);
      reset();
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error("Failed to create user:", error);
      setSuccess(false);
      setError(true);
    }
  };
  return (
    <AdminUser
      title="Create User"
      text="Use this form to create a new user and assign them a role"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-sm rounded-t-lg p-6 mt-10">
          <div className="flex gap-8 ">
            <InputBox
              title="Full name"
              register={register("full_name", {
                required: "Full name is required",
              })}
              error={errors.full_name?.message}
            />
            <InputBox
              title="Email"
              error={errors.email?.message}
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
          <div className="flex gap-8 ">
            <InputBox
              title="Password"
              type="password"
              placeholder="Set an intial password"
              error={errors.password?.message}
              register={register("password", {
                required: "Password is required",
              })}
            />
            <ComboBox
              register={register("role", { required: "Role is required" })}
              error={errors.role?.message}
              label="Role"
              options={[
                { value: "applicant", label: "Applicant" },
                { value: "reviewer", label: "Reviewer" },
                { value: "manager", label: "Manager" },
              ]}
            />
          </div>
          {success && (
            <div className="text-sm text-green-800">
              User created successfully
            </div>
          )}
          {error && (
            <div className="text-sm text-red-800">Failed on creating user</div>
          )}
        </div>
        <div className="flex justify-end text-sm rounded-b-lg bg-gray-50 shadow-sm p-2">
          <button
            className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg mr-4 hover:bg-gray-200"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            type="submit"
          >
            Create User
          </button>
        </div>
      </form>
    </AdminUser>
  );
};

export default CreateUser;
