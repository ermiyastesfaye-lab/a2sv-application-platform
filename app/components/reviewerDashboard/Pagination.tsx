const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      {/* Results Summary */}
      <div className="text-sm text-gray-500">Showing 1 to 6 of 42 results</div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="px-3 py-1 text-sm bg-[#4f46e5] text-white rounded-lg font-medium transition-colors cursor-pointer hover:bg-[#4338ca]">
          1
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors cursor-pointer">
          2
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors cursor-pointer">
          3
        </button>
        <span className="px-2 text-gray-400">...</span>
        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors cursor-pointer">
          7
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
