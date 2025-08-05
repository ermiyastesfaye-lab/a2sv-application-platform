import Input from "./Input";

const PasswordForm = () => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Change Password
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <Input type="password" id="currentPassword" />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <Input type="password" id="newPassword" />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <Input type="password" id="confirmPassword" />
        </div>
      </div>

      <div className="flex justify-end mt-6 bg-gray-50 text-black">
        <button className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-medium transition-colors cursor-pointer hover:bg-[#4338ca]">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
