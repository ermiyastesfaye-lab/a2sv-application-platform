"use client";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

const SetPassword = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/auth/login");
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
          Set a new password
        </h2>
        <div className="flex justify-center text-sm mb-6">
          <p className="text-center text-gray-500">
            Please choose a strong, new password for your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 text-black"
              style={{ "--tw-ring-color": "#4F46E5" } as React.CSSProperties}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4F46E5] text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
