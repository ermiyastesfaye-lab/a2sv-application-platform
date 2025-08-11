"use client";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/lib/redux/api/profileApi";
import ProfileHeader from "@/app/components/profileSet/ProfileHeader";
import InfoForm from "@/app/components/profileSet/InfoForm";
import PasswordForm from "@/app/components/profileSet/PasswordForm";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(
      "Profile data updated:",
      profileData?.data?.profile_picture_url
    );
  }, [profileData]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileHeader
            userProfile={profileData?.data}
            onSuccess={() => {
              console.log("Refetching profile...");
              refetch();
            }}
          />
          <div className="rounded-md shadow-xl overflow-hidden">
            <div className="px-6 pb-6 bg-white">
              <InfoForm userProfile={profileData?.data} onSuccess={refetch} />
              <PasswordForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const LoadingState = () => (
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

const ErrorState = () => (
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