"use client";
import React from "react";
import Button from "./components/Butt";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-120 text-center ">
      <div className="">
        <h1 className="text-8xl font-bold mt-10 text-[#4F46E5]">404</h1>
        <h2 className="text-2xl font-semibold"> Page Not Found</h2>
        <p className="text-sm text-gray-500 mt-4 mb-4">
          Sorry, we could not find page you are looking for.
        </p>
        <Button text="Go Home" onclick={() => router.push("/")} />
      </div>
    </div>
  );
};

export default ErrorPage;
