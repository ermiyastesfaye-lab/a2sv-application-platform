import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUpdateReviewMutation } from "@/lib/redux/api/reviewerApi";
import Input from "@/app/components/profileSet/Input";

interface EvaluationFormProps {
  applicationId: string;
  reviewDetails: any;
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
    if (readOnly) return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    try {
      await updateReview({
        applicationId,
        reviewData: formData,
      }).unwrap();

      // Show success message
      alert("Review updated successfully!");

      // Navigate back to appropriate dashboard
      // If coming from manager, go back to manager dashboard
      // Otherwise go to reviewer dashboard
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
                readOnly
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {readOnly ? "Read Only" : "Edit Mode"}
            </span>
          </div>
        </div>
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
              disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
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
              disabled={readOnly}
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
              disabled={readOnly}
            />
          </div>

          {!readOnly && (
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                {isLoading ? "Saving..." : "Submit Review"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EvaluationForm;
