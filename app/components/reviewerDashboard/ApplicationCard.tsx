interface ApplicationCardProps {
  id: string;
  image: string;
  name: string;
  submissionDate: string;
  status: "New" | "Under Review" | "Review Complete";
  actionButton: "Start Review" | "Continue Review" | "View Details";
  onAction: (id: string) => void;
}

const ApplicationCard = ({
  id,
  image,
  name,
  submissionDate,
  status,
  actionButton,
  onAction,
}: ApplicationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Review Complete":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getButtonVariant = (action: string) => {
    if (action === "View Details") {
      return "border border-gray-300 text-gray-700 hover:bg-gray-50";
    }
    return "bg-[#4f46e5] text-white hover:bg-[#4338ca]";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name, Date, and Status */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            Submitted: {submissionDate}
          </p>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full">
        <button
          onClick={() => onAction(id)}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${getButtonVariant(
            actionButton
          )}`}
        >
          {actionButton}
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
