import ApplicationCycleList from "@/app/components/ApplicationCycleList";
import { applicationCycle } from "@/data/application-cycle";
import React from "react";

const applicationCyclePage = () => {
  return (
    <section className="p-12">
      <div className="flex items-center justify-start gap-8 mb-6">
        <h1 className="ml-0 text-2xl font-bold">Application Cycles</h1>
        <button className="text-xs font-medium px-2 py-2 bg-[#4F46E5] hover:bg-indigo-700 text-white ml-150 rounded-md">
          Create New Cycle
        </button>
      </div>

      <section className="flex flex-col pb-0.5">
        <div className="bg-gray-100 grid p-6 gap-8 sm:grid-cols-2 lg:grid-cols-3 flex-wrap justify-items-center">
          {applicationCycle.map((cycle, index) => (
            <ApplicationCycleList key={index} {...cycle} />
          ))}
        </div>

        <section className="px-12 pt-0.5  mt-4">
          <p>
            showing results <span className="font-md">1</span> to{" "}
            <span className="font-md">1</span> of{" "}
            <span className="font-md">{applicationCycle.length} </span>results
          </p>
        </section>
      </section>
    </section>
  );
};

export default applicationCyclePage;
