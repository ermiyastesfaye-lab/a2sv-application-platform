"use client";
import {
  useGetApplicationStatusQuery,
  useGetCyclesClientQuery,
  useGetProfileQuery,
} from "@/lib/redux/api/clientApi";
import WelcomePage from "./components/WelcomePage";
import StatusPage from "./components/StatusPage";
import LoadingPage from "@/app/components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

export default function ApplicantDashboardPage() {
  const {
    data: statusResponse,
    isLoading: statusLoading,
    isError,
    error,
  } = useGetApplicationStatusQuery();

  const {
    data: cyclesResponse,
    isLoading: cyclesLoading,
    error: cyclesError,
  } = useGetCyclesClientQuery(null);
  const { data:profileData, isLoading:profileLoading, error: profileError } = useGetProfileQuery(null);

  if (statusLoading || cyclesLoading || profileLoading) return <LoadingPage />;

  const isNotFound =
    isError && error && "status" in error && (error as any).status === 404;

  const cycles = cyclesResponse?.data?.cycles || [];
  const name = profileData?.data?.full_name;
  const activeCycle = cycles.find((cycle: any) => cycle.is_active);

  if (isNotFound) {
    return (
      <WelcomePage
        userName={name}
        profileCompletion={75}
        applicationCycle={activeCycle?.name || "No Active Cycle"}
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
    return <StatusPage status={statusResponse.data.status} />;
  }

  return (
    <ErrorPage message={(error as any)?.data?.message || "Unknown error"} />
  );
}
