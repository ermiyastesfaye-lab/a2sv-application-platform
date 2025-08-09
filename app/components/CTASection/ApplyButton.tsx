"use client";
import { useRouter } from "next/navigation";

const ApplyButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/auth/login")}
        className="px-8 py-3 rounded-md bg-white text-indigo-700 font-medium shadow hover:bg-indigo-50 transition"
      >
        Apply Now
      </button>
    </div>
  );
};

export default ApplyButton;
