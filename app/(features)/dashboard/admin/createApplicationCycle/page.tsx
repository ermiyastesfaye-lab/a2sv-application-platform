"use client";
import CycleForm from "@/app/components/CreateApplicationCycle";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <section className="p-4 sm:p-12 flex justify-center">
      <div className="w-full max-w-5xl grid items-start gap-6">
        <button
          onClick={() => router.push("/dashboard/admin/applicationCycle")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-fit"
        >
          <ArrowLeft size={18} />
          Back to Application Cycles
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            Create new cycle
          </h1>
          <p className="text-gray-500">
            Use this form to create a new cycle and assign periods.
          </p>
        </div>

        <CycleForm />
      </div>
    </section>
  );
}
