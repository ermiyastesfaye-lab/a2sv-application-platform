import { useState } from "react";
import { useChangePasswordMutation } from "@/lib/redux/api/profileApi";
import Input from "./Input";

const PasswordForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.old_password) {
      newErrors.old_password = "Current password is required";
    }

    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
      }).unwrap();

      alert("Password changed successfully!");
      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.log(error)
      alert(
        "Error changing password. Please check your current password and try again."
      );
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <Input
            type="password"
            id="currentPassword"
            value={formData.old_password}
            onChange={(e) => handleInputChange("old_password", e.target.value)}
          />
          {errors.old_password && (
            <p className="text-red-500 text-sm mt-1">{errors.old_password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <Input
            type="password"
            id="newPassword"
            value={formData.new_password}
            onChange={(e) => handleInputChange("new_password", e.target.value)}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            value={formData.confirm_password}
            onChange={(e) =>
              handleInputChange("confirm_password", e.target.value)
            }
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6 bg-gray-50 text-black">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-medium transition-colors cursor-pointer hover:bg-[#4338ca] disabled:bg-gray-400"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
