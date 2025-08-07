import { ApplicationCycle } from "@/types/applicationCycle";
import { useActivateCycleMutation } from "@/lib/redux/api/adminApi";
import { useDeleteCycleMutation } from "@/lib/redux/api/adminApi";
import { useRouter } from "next/navigation";
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

  const handleActivate = async () => {
    try {
      await activateCycle({ cycleId: id }).unwrap();
      refetchCycles();
      console.log("Cycle activated");
    } catch (error) {
      console.error("Activation failed:", error);
    }
  };
  const router = useRouter();
  const handleUpdateCycle = () => {
    router.push(`/editApplicationCycle/${id}`);
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

  return (
    <div className="p-5 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{name}</h3>

        <section className="flex flex-row flex-nowrap items-center gap-1">
          <button
            onClick={handleUpdateCycle}
            className="text-xs font-medium px-2 py-1  bg-green-400 rounded-md"
          >
            {" "}
            Update
          </button>
          <button
            onClick={close ? handleActivate : handleDelete}
            className={`text-xs font-medium px-2 py-1  rounded-md ${
              close
                ? `bg-[#4F46E5] hover:bg-indigo-700`
                : `bg-orange-500 hover:bg-orange-700`
            } text-white`}
          >
            {close ? "Open" : "Delete"}
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
