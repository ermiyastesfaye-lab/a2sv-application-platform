"use client";

import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/lib/redux/api/profileApi";
import ProfileHeader from "@/app/components/profileSet/ProfileHeader";
import InfoForm from "@/app/components/profileSet/InfoForm";
import PasswordForm from "@/app/components/profileSet/PasswordForm";

export default function ProfilePage() {
  const router = useRouter();
  const { data: profileData, isLoading, error } = useGetUserProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <div className="text-red-600">
                Error loading profile. Please check your authentication and try
                again.
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileHeader userProfile={profileData?.data} />
          <div className="rounded-md shadow-xl overflow-hidden">
            <div className="px-6 pb-6 bg-white">
              <InfoForm userProfile={profileData?.data} />
              <PasswordForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
