import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUpdateReviewMutation } from "@/lib/redux/api/reviewerApi";
import Input from "@/app/components/profileSet/Input";

type ReviewDetails = {
  activity_check_notes?: string;
  resume_score?: number;
  essay_why_a2sv_score?: number;
  essay_about_you_score?: number;
  technical_interview_score?: number;
  behavioral_interview_score?: number;
  interview_notes?: string;
};

interface EvaluationFormProps {
  applicationId: string;
  reviewDetails: ReviewDetails | null;
  readOnly?: boolean;
  fromManager?: boolean;
}

const EvaluationForm = ({
  applicationId,
  reviewDetails,
  readOnly = false,
  fromManager = false,
}: EvaluationFormProps) => {
  const router = useRouter();
  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  // Debug logging
  console.log("EvaluationForm readOnly:", readOnly);
  console.log("EvaluationForm fromManager:", fromManager);
  console.log("EvaluationForm isEditMode:", isEditMode);

  // Determine if form should actually be read-only
  const isActuallyReadOnly = readOnly && !isEditMode;

  const [formData, setFormData] = useState({
    activity_check_notes: "",
    resume_score: 0,
    essay_why_a2sv_score: 0,
    essay_about_you_score: 0,
    technical_interview_score: 0,
    behavioral_interview_score: 0,
    interview_notes: "",
  });

  // Update form data when reviewDetails changes
  useEffect(() => {
    if (reviewDetails) {
      setFormData({
        activity_check_notes: reviewDetails.activity_check_notes || "",
        resume_score: reviewDetails.resume_score || 0,
        essay_why_a2sv_score: reviewDetails.essay_why_a2sv_score || 0,
        essay_about_you_score: reviewDetails.essay_about_you_score || 0,
        technical_interview_score: reviewDetails.technical_interview_score || 0,
        behavioral_interview_score:
          reviewDetails.behavioral_interview_score || 0,
        interview_notes: reviewDetails.interview_notes || "",
      });
    }
  }, [reviewDetails]);

  const handleInputChange = (field: string, value: string | number) => {
    if (isActuallyReadOnly) return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isActuallyReadOnly) return;
    try {
      await updateReview({
        applicationId,
        reviewData: formData,
      }).unwrap();

      // Show success message
      alert("Review updated successfully!");

      if (fromManager) {
        router.push("/dashboard/manager");
      } else {
        router.push("/dashboard/reviewer");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Error saving review. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Evaluation Form
          </h2>
          <div className="flex gap-2">
            {fromManager && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                Manager Edit
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isActuallyReadOnly
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {isActuallyReadOnly ? "Read Only" : "Edit Mode"}
            </span>
          </div>
        </div>

        {/* Edit Your Review Button - only show when in read-only mode */}
        {isActuallyReadOnly && (
          <div className="mb-4 flex flex-row-reverse">
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-light py-1 px-3 rounded-2xl transition duration-200 cursor-pointer"
            >
              Edit Your Review
            </button>
          </div>
        )}

        {/* Cancel Edit Button - only show when in edit mode */}
        {!isActuallyReadOnly && readOnly && (
          <div className="mb-4 flex flex-row-reverse">
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-light py-1 px-3 rounded-2xl transition duration-200 mr-2 cursor-pointer"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4">review all from 100</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Check Notes
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={formData.activity_check_notes}
              onChange={(e) =>
                handleInputChange("activity_check_notes", e.target.value)
              }
              disabled={isActuallyReadOnly}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume Score
              </label>
              <Input
                type="number"
                id="resume-score"
                value={formData.resume_score}
                onChange={(e) =>
                  handleInputChange(
                    "resume_score",
                    parseInt(e.target.value) || 0
                  )
                }
                disabled={isActuallyReadOnly}
                min={0}
                max={100}
                step={1}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Essay 1 Score
              </label>
              <Input
                type="number"
                id="essay-why-a2sv-score"
                value={formData.essay_why_a2sv_score}
                onChange={(e) =>
                  handleInputChange(
                    "essay_why_a2sv_score",
                    parseInt(e.target.value) || 0
                  )
                }
                disabled={isActuallyReadOnly}
                min={0}
                max={100}
                step={1}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Essay 2 Score
              </label>
              <Input
                type="number"
                id="essay-about-you-score"
                value={formData.essay_about_you_score}
                onChange={(e) =>
                  handleInputChange(
                    "essay_about_you_score",
                    parseInt(e.target.value) || 0
                  )
                }
                disabled={isActuallyReadOnly}
                min={0}
                max={100}
                step={1}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Interview Score
              </label>
              <Input
                type="number"
                id="technical-interview-score"
                value={formData.technical_interview_score}
                onChange={(e) =>
                  handleInputChange(
                    "technical_interview_score",
                    parseInt(e.target.value) || 0
                  )
                }
                disabled={isActuallyReadOnly}
                min={0}
                max={100}
                step={1}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Behavioral Interview Score
            </label>
            <Input
              type="number"
              id="behavioral-interview-score"
              value={formData.behavioral_interview_score}
              onChange={(e) =>
                handleInputChange(
                  "behavioral_interview_score",
                  parseInt(e.target.value) || 0
                )
              }
              disabled={isActuallyReadOnly}
              min={0}
              max={100}
              step={1}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Notes
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={formData.interview_notes}
              onChange={(e) =>
                handleInputChange("interview_notes", e.target.value)
              }
              disabled={isActuallyReadOnly}
            />
          </div>

          {!isActuallyReadOnly && (
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition duration-200 cursor-pointer"
              >
                {isLoading
                  ? "Saving..."
                  : readOnly
                  ? "Update Review"
                  : "Submit Review"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EvaluationForm;
