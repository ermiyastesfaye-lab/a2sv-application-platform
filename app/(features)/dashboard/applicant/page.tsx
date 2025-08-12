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
import { Cycle } from "@/lib/types/applicationCycles";

export default function ApplicantDashboardPage() {
  const {
    data: statusResponse,
    isLoading: statusLoading,
    isError,
    error,
  } = useGetApplicationStatusQuery();

  const { data: cyclesResponse, isLoading: cyclesLoading } =
    useGetCyclesClientQuery(null);
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileQuery(null);

  if (statusLoading || cyclesLoading || profileLoading) return <LoadingPage />;

  // const isNotFound = isError && error && "status" in error && error.status === 404;
  const isNotFound =
    isError &&
    error &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: number }).status === 404;

  const cycles = cyclesResponse?.data?.cycles || [];
  const name = profileData?.data?.full_name;
  const activeCycle = cycles.find((cycle: Cycle) => cycle.is_active);

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
    return <StatusPage status={statusResponse.data?.status} />;
  }

  return (
    <ErrorPage  />
  );
}
