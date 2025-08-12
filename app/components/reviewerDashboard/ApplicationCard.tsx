import Image from "next/image";

type ActionLabel = "Start Review" | "Continue Review" | "View Details";
interface ApplicationCardProps {
  id: string;
  image?: string;
  name: string;
  submissionDate: string;
  status: "New" | "Under Review" | "Review Complete";
  actionButton: ActionLabel;
  onAction: (id: string, action: ActionLabel) => void;
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

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if image is a valid URL or use initials
  const hasValidImage =
    image && image.trim() !== "" && !image.includes("/images/alumni1.png");

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {hasValidImage ? (
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm">
              {getInitials(name)}
            </div>
          )}
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

      {/* Action Button(s) */}
      <div className="w-full">
        <button
          onClick={() => onAction(id, actionButton)}
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
