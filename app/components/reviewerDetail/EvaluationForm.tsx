import Input from "@/app/components/profileSet/Input";

const EvaluationForm = () => {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Evaluation Form
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity/Good Notes
            </label>
            <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume Score
              </label>
              <Input type="number" id="resume-score" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Essay Score
              </label>
              <Input type="number" id="essay-score" />
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition duration-200">
              Save & Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;
