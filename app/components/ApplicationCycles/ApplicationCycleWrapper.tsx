"use client";

import React, { useState } from "react";
import ApplicationCycleList from "./ApplicationCycleList";
import { applicationCycle } from "@/data/application-cycle";
import PaginationControls from "./PaginationControls";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const ApplicationCycleWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = applicationCycle.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCycles = applicationCycle.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-start gap-8 mb-6">
        <h1 className="ml-0 text-2xl font-bold">Application Cycles</h1>
        <button
          className="text font-medium px-3 py-2 bg-[#4F46E5] hover:bg-indigo-700 text-white ml-150 rounded-md"
          onClick={() => router.push("/createApplicationCycle")}
        >
          Create New Cycle
        </button>
      </div>

      <section className="flex flex-col pb-0.5">
        <div className="bg-gray-100 grid p-6 gap-8 sm:grid-cols-2 lg:grid-cols-3 flex-wrap justify-items-center">
          {currentCycles.map((cycle, index) => (
            <ApplicationCycleList key={index} {...cycle} />
          ))}
        </div>

        <section className="px-12 pt-4 mt-4 flex justify-between items-center w-full">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="font-semibold">{totalItems}</span> results
          </p>

          <p> </p>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </section>
    </>
  );
};

export default ApplicationCycleWrapper;
