"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import DashboardHeader from "@/app/components/reviewerDashboard/DashboardHeader";
import ApplicationCard from "@/app/components/reviewerDashboard/ApplicationCard";
import Pagination from "@/app/components/reviewerDashboard/Pagination";

interface Application {
  id: string;
  image: string;
  name: string;
  submissionDate: string;
  status: "New" | "Under Review" | "Review Complete";
  actionButton: "Start Review" | "Continue Review" | "View Details";
}

export default function ReviewerDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data matching the image exactly
      const mockApplications: Application[] = [
        {
          id: "1",
          image: "/images/alumni1.png",
          name: "Abel Tadesse",
          submissionDate: "Oct 23, 2023",
          status: "Under Review",
          actionButton: "Continue Review",
        },
        {
          id: "2",
          image: "/images/alumni2.png",
          name: "Bethlehem Tadesse",
          submissionDate: "Oct 24, 2023",
          status: "Review Complete",
          actionButton: "View Details",
        },
        {
          id: "3",
          image: "/images/alumni3.png",
          name: "Caleb Alemayehu",
          submissionDate: "Oct 25, 2023",
          status: "Under Review",
          actionButton: "Continue Review",
        },
        {
          id: "4",
          image: "/images/alumni1.png",
          name: "Abel Tadesse",
          submissionDate: "Oct 23, 2023",
          status: "New",
          actionButton: "Start Review",
        },
        {
          id: "5",
          image: "/images/alumni2.png",
          name: "Bethlehem Tadesse",
          submissionDate: "Oct 24, 2023",
          status: "New",
          actionButton: "Start Review",
        },
        {
          id: "6",
          image: "/images/alumni3.png",
          name: "Caleb Alemayehu",
          submissionDate: "Oct 25, 2023",
          status: "New",
          actionButton: "Start Review",
        },
      ];

      setApplications(mockApplications);
      setLoading(false);
    };

    fetchApplications();
  }, []);

  const handleAction = (applicationId: string) => {
    console.log(`Action for application: ${applicationId}`);
    alert(`Redirecting to review page for application: ${applicationId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10">
        <DashboardHeader />

        {/* Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              id={application.id}
              image={application.image}
              name={application.name}
              submissionDate={application.submissionDate}
              status={application.status}
              actionButton={application.actionButton}
              onAction={handleAction}
            />
          ))}
        </div>

        <Pagination />
      </main>
    </div>
  );
}
