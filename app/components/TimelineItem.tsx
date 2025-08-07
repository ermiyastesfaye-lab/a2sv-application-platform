import { FaCheck, FaSpinner } from "react-icons/fa";

interface TimelineItemProps {
  title: string;
  description: React.ReactNode;
  date?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export function TimelineItem({
  title,
  description,
  date,
  isCompleted,
  isCurrent = false,
}: TimelineItemProps) {
  const isUpcoming = !isCompleted && !isCurrent;

  return (
    <div className="flex items-start gap-3">
      {/* Circle + Vertical Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center
            ${isCompleted ? "bg-green-500 text-white" : ""}
            ${isCurrent && !isCompleted ? "bg-indigo-500 text-white" : ""}
            ${
              isUpcoming
                ? "border-2 border-gray-300 bg-white text-gray-400"
                : ""
            }
          `}
        >
          {isCompleted && <FaCheck className="w-4 h-4" />}
          {isCurrent && !isCompleted && (
            <FaSpinner className="w-4 h-4 animate-spin" />
          )}
        </div>
        {/* Line under the circle */}
        <div className="w-0.5 h-8 bg-gray-300"></div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 pb-2 ${isUpcoming ? "opacity-50" : "opacity-100"}`}
      >
        <h3 className="text-[17px] font-semibold text-gray-800">{title}</h3>
        {date && (
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
        <p className="mt-1 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
