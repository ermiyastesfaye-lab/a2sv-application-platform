"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSubmitApplicationMutation,
  useDeleteApplicationMutation,
} from "@/lib/redux/api/clientApi";
import { ConfirmDialog } from "./ConfirmDelete"; 

interface ActionButtonsProps {
  applicationId: string;
}

export const InProgressActionButtons: React.FC<ActionButtonsProps> = ({
  applicationId,
}) => {
  const router = useRouter();

  const [submitApplication] = useSubmitApplicationMutation();
  const [deleteApplication] = useDeleteApplicationMutation();

  // dialog state
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    try {
      await submitApplication(applicationId).unwrap();
      alert("Application submitted");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteApplication(applicationId).unwrap();
      router.push("/dashboard/applicant");
    } catch (error) {
      console.log(error);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleEdit = () => {
    router.push(`/application`);
  };

  return (
    <>
      <div className="flex gap-3 my-2">
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 text-red-600 border border-red-400 rounded hover:bg-red-50"
        >
          Delete
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-blue-600 border border-blue-400 rounded hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
      />
    </>
  );
};
