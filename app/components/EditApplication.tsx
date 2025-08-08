"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import {
  useGetCycleByIdQuery,
  useEditCycleMutation,
} from "@/lib/redux/slices/adminSlice";

interface EditCycleFormProps {
  editCycleId: string | null;
}

const EditCycleForm = ({ editCycleId }: EditCycleFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data, isLoading: isFetching } = useGetCycleByIdQuery(editCycleId);

  const [editCycle, { isLoading, isSuccess, isError }] = useEditCycleMutation();

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data?.data.name,
        start_date: data?.data.start_date,
        end_date: data?.data.end_date,
        description: data?.data.description,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    setDateError("");
    console.log("Form Data:", data);

    const start = new Date(data.start_date);
    const end = new Date(data.end_date);

    if (start >= end) {
      setDateError("Start date must be earlier than end date.");
      return;
    }

    try {
      const response = await editCycle({
        id: editCycleId,
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        description: data.description,
      }).unwrap();

      console.log("Cycle updated successfully", response);
    } catch (error) {
      console.error("Error updating cycle:", error);
    }
  };

  if (isFetching) {
    return <p>Loading cycle data...</p>;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-sm w-full max-w-4xl space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Cycle Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Cycle name is required" })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
          />
          {errors.name && (
            <p className="text-rose-500/90 text-sm mt-1">
              {typeof errors.name?.message === "string" && errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Description
          </label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
          />
          {errors.description &&
            typeof errors.description.message === "string" && (
              <p className="text-rose-500/90 text-sm mt-1">
                {errors.description.message}
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
            {...register("start_date", { required: "Start date is required" })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
          />
          {errors.start_date && (
            <p className="text-rose-500/90 text-sm mt-1">
              {typeof errors.start_date?.message === "string" &&
                errors.start_date.message}
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
            {...register("end_date", { required: "End date is required" })}
            className="w-full rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
          />
          {errors.end_date?.message && (
            <p className="text-rose-500/90 text-sm mt-1">
              {errors.end_date.message as string}
            </p>
          )}
        </div>
      </div>

      {dateError && (
        <p className="text-rose-500/90 text-sm -mt-4">{dateError}</p>
      )}

      <div className="pt-2">
        {isLoading && <p className="text-sm text-blue-500">Submitting...</p>}
        {isSuccess && (
          <p className="text-sm text-green-600">Cycle updated successfully!</p>
        )}
        {isError && (
          <p className="text-sm text-rose-500/90">
            Something went wrong. Please try again.
          </p>
        )}
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditCycleForm;
