"use client";

import React, { useState } from "react";
import ApplicationCycleList from "./ApplicationCycleList";
import PaginationControls from "./PaginationControls";
import { useGetCyclesQuery } from "@/lib/redux/api/applicationCyclesApi";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const ApplicationCycleWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGetCyclesQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const totalItems = data?.data?.total_count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentCycles = data?.data?.cycles || [];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64 mt-13">
        <p className="text-sm sm:text-base text-gray-600 animate-pulse">
          Loading cycles...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="texedit-sm sm:text-base text-red-500 font-medium">
          Error loading application cycles.
        </p>
      </div>
    );
  return (
    <>
      <div className="px-4 sm:px-12 pt-4 mt-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-4 sm:gap-0 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Application Cycles</h1>
        {""}
        <button
          className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-[6px] font-light
          h-[36px] sm:h-[40px] px-4 sm:px-6 min-w-[30px] sm:min-w-[168px]
          text-sm sm:text-base flex items-center justify-center transition-colors duration-200"
          onClick={() => router.push("/dashboard/admin/createApplicationCycle")}
        >
          Create New Cycle
        </button>
      </div>

      <section className="flex flex-col pb-0.5">
        <div className="bg-gray-100 grid p-4 sm:p-6 gap-6  sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {currentCycles.map((cycle) => (
            <ApplicationCycleList
              key={cycle.id}
              name={cycle.name}
              description={cycle.description}
              country={"Ethiopia"}
              is_active={cycle.is_active ? "Active" : "Closed"}
              close={!cycle.is_active}
              id={`${cycle.id}`}
              refetchCycles={refetch}
            />
          ))}
        </div>

        <section className="px-4 sm:px-12 pt-4 mt-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-4 sm:gap-0 text-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="font-semibold">{totalItems}</span> results
          </p>

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
