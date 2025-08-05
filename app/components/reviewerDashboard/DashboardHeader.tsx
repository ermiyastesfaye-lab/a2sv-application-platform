const DashboardHeader = () => {
  return (
    <div className="mb-8">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Assigned Applications
        </h1>
        <p className="text-gray-600">
          You have 5 applications waiting for your review.
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center">
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-full bg-[#4f46e5] text-white font-medium transition-colors cursor-pointer hover:bg-[#4338ca]">
            All
          </button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium transition-colors cursor-pointer">
            Under Review
          </button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors cursor-pointer">
            Complete
          </button>
        </div>

        {/* Sort Option */}
        <div className="text-sm text-gray-500">Sort by Submission Date</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
