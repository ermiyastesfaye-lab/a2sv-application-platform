"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginAdminMutation, useLoginMutation } from "../../services/auth";

const Login = () => {
  const router = useRouter();
  const [login, { data, error, isError, isLoading, isSuccess }] =
    useLoginAdminMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      }).unwrap();
      alert("Admin Logged in successfully");
      router.push("/dashboard/admin");
    } catch (err: any) {
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
          Sign in to your account
        </h2>
        <div className="flex justify-center text-sm mb-6">
          <Link href="/" className="hover:underline mr-1 text-[#4F46E5]">
            Back to Home
          </Link>
          <div style={{ borderRight: "1px solid #4F46E5" }}></div>
          <Link
            href="/auth/signup"
            className="hover:underline ml-1 text-[#4F46E5]"
          >
            Create a new applicant account
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="password123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                style={{ accentColor: "#4F46E5" }}
              />
              <p className="text-black">Remember me</p>
            </label>
            <Link
              href="/auth/forgot-password"
              className="hover:underline text-sm text-[#4F46E5]"
            >
              Forgot your password?
            </Link>
          </div>
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {isError && error && (
            <div className="text-red-500 text-sm">
              {"data" in error && (error as any).data?.message
                ? (error as any).data.message
                : "An error occurred. Please try again."}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4F46E5] text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
