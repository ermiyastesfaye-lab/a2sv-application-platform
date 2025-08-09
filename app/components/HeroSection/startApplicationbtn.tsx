"use client";
import React from "react";
import { useRouter } from "next/navigation";

const StartButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/auth/login")}
      className="bg-[#4F46E5] px-6 py-3 rounded-md font-semibold mt-6"
    >
      Start Your Application
    </button>
  );
};

export default StartButton;
