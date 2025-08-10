"use client";
import { ApplicationCycle } from "@/types/applicationCycle";
import {
  useActivateCycleMutation,
  useDeleteCycleMutation,
  useDeactivateCycleMutation,
} from "@/lib/redux/slices/adminSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

const ApplicationCycleList: React.FC<ApplicationCycle> = ({
  name,
  description,
  country,
  is_active,
  close,
  id,
  refetchCycles,
}) => {
  const [activateCycle, { isLoading: isActivating }] =
    useActivateCycleMutation();
  const [deleteCycle, { isLoading: isDeleting }] = useDeleteCycleMutation();
  const [deactivateCycle, { isLoading: isDeactiving }] =
    useDeactivateCycleMutation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState("");

  useEffect(() => {
    if (
      searchParams.get("success") === "cycle-created" ||
      searchParams.get("success") === "cycle-updated"
    ) {
      setShowSuccess(searchParams.get("success") || "");

      const timeout = setTimeout(() => {
        setShowSuccess("");
        router.replace("/dashboard/admin/applicationCycle");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  const handleActivate = async () => {
    try {
      await activateCycle({ cycleId: id }).unwrap();
      refetchCycles();
      console.log("Cycle activated");
    } catch (error) {
      console.error("Activation failed:", error);
    }
  };

  const handleUpdateCycle = () => {
    router.push(`/dashboard/admin/editApplicationCycle/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteCycle({ cycleId: id }).unwrap();
      refetchCycles();
      console.log("Cycle deleted");
    } catch (error) {
      console.log("Deletion failed", error);
    }
  };
  const handleClose = async () => {
    try {
      await deactivateCycle({ cycleId: id }).unwrap();
      refetchCycles();
      console.log("Cycle deactivated");
    } catch (error) {
      console.log("Deactivation failed", error);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-xl     w-full max-w-[350px] min-w-[280px] min-h-[180px] flex flex-col justify-between">
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg transition-all">
          Application cycle{" "}
          {showSuccess === "cycle-created" ? "created" : "updated"} successfully
        </div>
      )}
      <div className="flex justify-between items-center  ">
        <h3 className="font-semibold text-gray-900">{name}</h3>

        <section className="flex flex-row flex-nowrap items-center gap-1 px-2">
          <button
            onClick={handleUpdateCycle}
            className="text-xs font-medium px-2 py-1 hover:bg-blue-300 rounded-md bg-blue-200"
          >
            Update
          </button>
          <button
            onClick={close ? handleActivate : handleClose}
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              close
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : "bg-orange-100 text-orange-800 hover:bg-orange-200"
            }`}
          >
            {close ? "Open" : "Close"}
          </button>
          <button
            onClick={handleDelete}
            className="text-xs font-medium px-2 py-1 bg-red-200 rounded-md hover:bg-red-300"
          >
            Delete
          </button>
        </section>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex justify-between items-center mt-4 text-sm">
        <p className="text-gray-500">
          Country:{" "}
          <span className="font-semibold text-gray-500">{country}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className={
              is_active === "Active"
                ? "text-green-600 font-semibold"
                : "text-gray-500 font-semibold"
            }
          >
            {is_active}
          </span>
        </p>
      </div>
    </div>
  );
};
export default ApplicationCycleList;
