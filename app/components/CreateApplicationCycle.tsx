"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateNewApplicationCycle } from "@/types/applicationCycle";

const CycleForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNewApplicationCycle>();

  const onSubmit = (data: CreateNewApplicationCycle) => {
    reset();
    console.log(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-sm w-full max-w-4xl space-y-6"
    >
      <div className="grid grid-cols-2 gap-4 ">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Cycle Name
          </label>
          <input
            type="text"
            {...register("cycleName", { required: "Cycle name is required" })}
            className="w-full  rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.cycleName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cycleName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Country
          </label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Start Date
          </label>
          <input
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            {...register("startDate", { required: "Start date is required" })}
            className="w-full   rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            End Date
          </label>
          <input
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            {...register("endDate", { required: "End date is required" })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="bg-[#F9FAFB] -mx-6 -mb-6 px-6 py-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-[#4F46E5] hover:bg-indigo-700"
        >
          Save Cycle
        </button>
      </div>
    </form>
  );
};

export default CycleForm;
