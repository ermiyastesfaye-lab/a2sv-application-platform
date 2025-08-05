"use client";

import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/components/profileSet/ProfileHeader";
import InfoForm from "@/app/components/profileSet/InfoForm";
import PasswordForm from "@/app/components/profileSet/PasswordForm";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileHeader />
          <div className="rounded-md shadow-xl overflow-hidden">
            <div className="px-6 pb-6 bg-white">
              <InfoForm />
              <PasswordForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
