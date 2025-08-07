"use client";

import { useGetApplicationStatusQuery } from "@/lib/redux/api/clientApi";
import WelcomePage from "./components/WelcomePage";
import StatusPage from "./components/StatusPage";
import LoadingPage from "@/app/components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

export default function ApplicantDashboardPage() {
  const {
    data: statusResponse,
    isLoading,
    isError,
    error,
  } = useGetApplicationStatusQuery();

  if (isLoading) return <LoadingPage />;

  const isNotFound =
    isError && error && "status" in error && (error as any).status === 404;

  if (isNotFound) {
    return (
      <WelcomePage
        userName="John Doe"
        profileCompletion={75}
        applicationCycle="G7 November Intake"
        checklist={[
          { label: "Create an Account", completed: true },
          { label: "Fill Personal Information", completed: false },
          { label: "Submit Coding Profiles", completed: false },
          { label: "Write Essays", completed: false },
          { label: "Upload Resume", completed: false },
        ]}
      />
    );
  }

  if (statusResponse?.success && statusResponse?.data) {
    return <StatusPage status={statusResponse?.data?.status} />;
  }

  return <ErrorPage message={(error as any)?.data?.message} />;
}
