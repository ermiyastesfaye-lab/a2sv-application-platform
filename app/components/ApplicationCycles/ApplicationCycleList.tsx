import { ApplicationCycle } from "@/types/applicationCycle";
import React from "react";

const ApplicationCycleList: React.FC<ApplicationCycle> = ({
  name,
  description,
  country,
  is_active,
  close,
}) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{name}</h3>

        <button
          className={`text-xs font-medium px-2 py-1  rounded-md ${
            close
              ? `bg-[#4F46E5] hover:bg-indigo-700`
              : `bg-orange-500 hover:bg-orange-700`
          } text-white`}
        >
          Close
        </button>
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
