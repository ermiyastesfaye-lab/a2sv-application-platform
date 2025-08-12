"use client";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../../../../lib/redux/api/auth";
import Image from "next/image";

import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await forgotPassword({
        email,
        callback_url: `${window.location.origin}/auth/set-password`,
      }).unwrap();
      setSuccess("If your email exists, a reset link has been sent.");
    } catch (e) {
      console.log(e)
      setError("error");
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
          Forgot your password?
        </h2>
        <div className="flex justify-center text-sm mb-6">
          <p className="text-center text-gray-500">
            Enter your email and we&apos;ll send you a link to get back into your
            account.
          </p>
          <div style={{ borderRight: "1px solid #4F46E5" }}></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {success && <p className="text-green-600 text-sm">{success}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4F46E5] text-white font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
          <Link href="/auth/login">
            <button
              type="button"
              className="w-full text-[#4F46E5]  font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Back to login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
