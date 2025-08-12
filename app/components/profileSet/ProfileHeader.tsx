import { useRef, useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/lib/redux/api/profileApi";
import Image from "next/image";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
}

interface ProfileHeaderProps {
  userProfile?: UserProfile;
  onSuccess?: () => void;
}

const ProfileHeader = ({ userProfile, onSuccess }: ProfileHeaderProps) => {
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleAvatarClick = () => fileInputRef.current?.click();

  useEffect(() => {
    setHasError(false);
    if (userProfile?.profile_picture_url) {
      setCurrentAvatar(`${userProfile.profile_picture_url}?t=${Date.now()}`);
    } else {
      setCurrentAvatar(null); 
    }
  }, [userProfile?.profile_picture_url]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("profile_picture", file);
      formData.append("full_name", userProfile?.full_name || "");
      formData.append("email", userProfile?.email || "");

      await updateProfile(formData).unwrap();
      onSuccess?.();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to update profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-full mb-6">
      <div
        className="w-full h-48 bg-cover bg-center rounded-lg animate-gradient"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), " +
            "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "500% 500%",
          animation: "gradientBG 15s ease infinite",
        }}
      />

      <div className="relative px-6">
        <div className="absolute -top-16 left-6">
          <button
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="relative group"
            aria-label="Change profile picture"
          >
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gray-900">
              {!hasError && currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt="Profile"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isUploading ? "opacity-50" : "opacity-100"
                  }`}
                  onError={() => setHasError(true)}
                />
              ) : (
               
                <div className="w-full h-full" />
              )}

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
              )}

              {!isUploading &&
                !userProfile?.profile_picture_url &&
                !hasError && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Upload
                    </span>
                  </div>
                )}
            </div>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="pb-5 pt-2 pl-36">
          <h1 className="text-2xl font-semibold text-gray-900">
            {userProfile?.full_name || "Loading..."}
          </h1>
          <p className="text-gray-600">{userProfile?.email || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
