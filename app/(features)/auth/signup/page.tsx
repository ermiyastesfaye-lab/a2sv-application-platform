"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../../../../lib/redux/api/auth";

const Signup = () => {
  const router = useRouter();
  const [register, {  error, isError, isLoading }] =
    useRegisterMutation();
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    try {
      await register({
        full_name: form.fullName,
        email: form.email,
        password: form.password,
      }).unwrap();
      alert("User created successfully!");
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <Image
            src="/a2svlogo(blue).png"
            alt="A2SV Logo"
            width={160}
            height={160}
            className="mb-2"
            priority
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-1 text-black">
          Create a new applicant account
        </h2>
        <div className="flex justify-center text-sm mb-6">
          <p className="text-gray-900">Or </p>
          <Link
            href="/auth/login"
            className="hover:underline ml-1 text-[#4F46E5]"
          >
            sign in to your existing account
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="username"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {isError && error && (
            <div className="text-red-500 text-sm">
              {"An error occurred. Please try again."}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4F46E5] text-white font-semibold rounded-lg transition-colors cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
