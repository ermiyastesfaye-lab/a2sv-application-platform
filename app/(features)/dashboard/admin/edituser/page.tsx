"use client";
import AdminUser from "@/app/components/AdminUser";
import InputBox from "@/app/components/AdminUser/InputBox/InputBox";
import ComboBox from "@/app/components/AdminUser/ComboBox/ComboBox";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/lib/redux/slices/adminSlice";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@/lib/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";

const EditUser = () => {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("id");
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    if (data) {
      setUser({
        full_name: data.data.full_name,
        email: data.data.email,
        password: "",
        role: data.data.role,
      });
    }
  }, [data]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name,
        role: user.role,
        email: user.email,
      });
    }
  }, [user, reset]);

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await updateUser({
        id: userId,
        full_name: data.full_name,
        role: data.role,
      }).unwrap();
      // console.log("User updated successfully:", response);
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      setError(true);
      setSuccess(false);
    }
  };
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AdminUser
      title={`Edit User: ${user.full_name}`}
      text="Use this form to update the user's information and role"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-sm rounded-t-lg p-6 mt-10">
          <div className="flex gap-8">
            <InputBox
              title="Full name"
              placeholder="Full name"
              register={register("full_name", {
                required: "Full name is required",
              })}
              error={errors.full_name?.message}
            />
            <InputBox
              title="Email address"
              type="email"
              placeholder="Email address"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.email?.message}
            />
          </div>
          <div className="flex gap-8">
            <InputBox
              title="Password"
              type="password"
              placeholder="Set a new password"
              disabled={true}
            />
            <ComboBox
              label="Role"
              register={register("role", { required: "Role is required" })}
              error={errors.role?.message}
              options={[
                { value: "applicant", label: "Applicant" },
                { value: "reviewer", label: "Reviewer" },
                { value: "manager", label: "Manager" },
                { value: "admin", label: "Admin" },
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
            Update User
          </button>
        </div>
      </form>
    </AdminUser>
  );
};

export default EditUser;
