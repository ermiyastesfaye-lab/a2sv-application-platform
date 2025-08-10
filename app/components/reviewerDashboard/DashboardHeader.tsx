interface DashboardHeaderProps {
  totalAssigned?: number;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const DashboardHeader = ({
  totalAssigned,
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
}: DashboardHeaderProps) => {
  const getFilterButtonClass = (filter: string) => {
    return currentFilter === filter
      ? "px-3 py-1 text-sm rounded-full bg-[#4f46e5] text-white font-medium transition-colors cursor-pointer hover:bg-[#4338ca]"
      : "px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium transition-colors cursor-pointer";
  };

  return (
    <div className="mb-8">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Assigned Applications
        </h1>
        <p className="text-gray-600">
          {typeof totalAssigned === "number"
            ? `You have ${totalAssigned} application${
                totalAssigned === 1 ? "" : "s"
              } waiting for your review.`
            : "Loading applications..."}
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center">
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => onFilterChange("all")}
            className={getFilterButtonClass("all")}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("under_review")}
            className={getFilterButtonClass("under_review")}
          >
            Under Review
          </button>
          <button
            onClick={() => onFilterChange("reviewed")}
            className={getFilterButtonClass("reviewed")}
          >
            Complete
          </button>
        </div>

        {/* Sort Option */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="submission_date">Submission Date</option>
            <option value="applicant_name">Applicant Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
