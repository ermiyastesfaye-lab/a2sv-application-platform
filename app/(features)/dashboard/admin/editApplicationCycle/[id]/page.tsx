"use client";
import EditCycleForm from "@/app/components/EditApplication";
import { useSearchParams } from "next/navigation";
import React from "react";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default function Home({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  console.log("Edit Cycle ID:", id);
  return (
    <section className="p-4 sm:p-12 flex justify-center">
      <div className="w-full max-w-5xl grid items-start gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            Update cycle
          </h1>
          <p className="text-gray-500">Use this form to edit a cycle.</p>
        </div>
        <EditCycleForm editCycleId={id} />
      </div>
    </section>
  );
}
