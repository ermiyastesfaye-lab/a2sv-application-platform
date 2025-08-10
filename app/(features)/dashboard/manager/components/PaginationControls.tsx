"use client";
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-1.5 text-sm font-light ${
          page === currentPage
            ? "bg-[#EEF2FF] text-[#6366F1] hover:bg-indigo-200  border border-[#6366F1]"
            : "text-[#6B7280] hover:bg-[#EEF2FF] border border-gray-300"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-2.5 py-1 rounded-l text-[#6B7280] hover:text-black border border-gray-300 disabled:opacity-40"
      >
        {"<"}
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-2.5 py-1 rounded-r text-[#6B7280] border border-gray-300 hover:text-black disabled:opacity-40"
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationControls;
