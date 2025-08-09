import { useState } from "react";
import { useUpdateProfileMutation } from "@/lib/redux/api/profileApi";
import Input from "./Input";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
}

interface InfoFormProps {
  userProfile?: UserProfile;
  onSuccess?: () => void;
}

const InfoForm = ({ userProfile, onSuccess }: InfoFormProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    email: userProfile?.email || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const data = new FormData();
       data.append("full_name", formData.full_name);
       data.append("email", formData.email);
      await updateProfile(data).unwrap();
      alert("Profile updated successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full name
          </label>
          <Input
            type="text"
            id="fullName"
            value={formData.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <Input
            type="text"
            id="role"
            value={userProfile?.role || ""}
            disabled
            className="w-full px-3 py-1 border border-gray-100 rounded-xl text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-end mt-6 bg-gray-50 text-black">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-medium transition-colors cursor-pointer hover:bg-[#4338ca] disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
