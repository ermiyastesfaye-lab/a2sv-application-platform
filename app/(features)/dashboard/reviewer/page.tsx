"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  setCurrentPage,
  setStatusFilter,
  setSearchQuery,
  setSortBy,
} from "@/lib/redux/slices/reviewerSlice";
import {
  useGetAssignedReviewsQuery,
  useGetReviewStatusesQuery,
  useUpdateReviewMutation,
} from "@/lib/redux/api/reviewerApi";
import NavBar from "@/app/components/NavBar";
import DashboardHeader from "@/app/components/reviewerDashboard/DashboardHeader";
import ApplicationCard from "@/app/components/reviewerDashboard/ApplicationCard";
import Pagination from "@/app/components/reviewerDashboard/Pagination";

export default function ReviewerDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentPage, pageSize, statusFilter, searchQuery, sortBy } =
    useSelector((state: RootState) => state.reviewer);

  const { data, isLoading, error, refetch } = useGetAssignedReviewsQuery(
    {
      page: currentPage,
      limit: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const reviews = data?.data.reviews || [];
  const applicationIds = reviews.map((review) => review.application_id);

  // Get review statuses for all applications
  const { data: reviewStatuses, isLoading: statusesLoading } =
    useGetReviewStatusesQuery(applicationIds, {
      skip: applicationIds.length === 0,
    });

  const [updateReview] = useUpdateReviewMutation();

  const handleAction = async (applicationId: string, actionLabel?: string) => {
    if (actionLabel === "Start Review") {
      try {
        await updateReview({
          applicationId,
          reviewData: {
            activity_check_notes: "",
            resume_score: 0,
            essay_why_a2sv_score: 0,
            essay_about_you_score: 0,
            technical_interview_score: 0,
            behavioral_interview_score: 0,
            interview_notes: "",
          },
        }).unwrap();
        // make sure the list is fresh when the user comes back
        refetch();
      } catch (err) {
        // proceed to details even if initialization fails
      }
      router.push(`/details/reviewer/${applicationId}`);
      return;
    }
    if (actionLabel === "View Details") {
      router.push(`/details/reviewer/${applicationId}?mode=view`);
      return;
    }
    if (actionLabel === "Edit") {
      router.push(`/details/reviewer/${applicationId}`);
      return;
    }
    // Continue Review falls back to normal edit mode
    router.push(`/details/reviewer/${applicationId}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleStatusFilterChange = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSortBy(sort));
  };

  if (isLoading || statusesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader
            totalAssigned={data?.data.total_count || 0}
            currentFilter={statusFilter || "all"}
            onFilterChange={handleStatusFilterChange}
            currentSort={sortBy}
            onSortChange={handleSortChange}
          />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader
            totalAssigned={0}
            currentFilter={statusFilter || "all"}
            onFilterChange={handleStatusFilterChange}
            currentSort={sortBy}
            onSortChange={handleSortChange}
          />
          <div className="flex justify-center items-center py-12">
            <div className="text-red-600">
              Error loading applications. Please check your authentication and
              try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalCount = data?.data.total_count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Filter reviews based on status filter and review statuses
  const filteredReviews = reviews.filter((review) => {
    if (!statusFilter || statusFilter === "all") return true;

    const reviewStatus = reviewStatuses?.[review.application_id];
    if (!reviewStatus) return false;

    if (statusFilter === "under_review") {
      return reviewStatus.hasReview && !reviewStatus.isCompleted;
    }
    if (statusFilter === "reviewed") {
      return reviewStatus.isCompleted;
    }

    return true;
  });

  // Sort filtered reviews based on sortBy
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const reviewStatusA = reviewStatuses?.[a.application_id];
    const reviewStatusB = reviewStatuses?.[b.application_id];

    // Determine display status for sorting
    const getDisplayStatus = (review: any, reviewStatus: any) => {
      if (reviewStatus?.isCompleted) return "Review Complete";
      if (reviewStatus?.hasReview) return "Under Review";
      return "New";
    };

    const statusA = getDisplayStatus(a, reviewStatusA);
    const statusB = getDisplayStatus(b, reviewStatusB);

    switch (sortBy) {
      case "applicant_name":
        return a.applicant_name.localeCompare(b.applicant_name);
      case "status":
        return statusA.localeCompare(statusB);
      case "submission_date":
      default:
        return (
          new Date(b.submission_date).getTime() -
          new Date(a.submission_date).getTime()
        );
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 mb-10">
        <DashboardHeader
          totalAssigned={totalCount}
          currentFilter={statusFilter || "all"}
          onFilterChange={handleStatusFilterChange}
          currentSort={sortBy}
          onSortChange={handleSortChange}
        />

        {/* Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review) => {
            const reviewStatus = reviewStatuses?.[review.application_id];

            // Determine status based on review statuses
            let status: "New" | "Under Review" | "Review Complete";
            let actionButton:
              | "Start Review"
              | "Continue Review"
              | "View Details"
              | "Edit";

            if (reviewStatus?.isCompleted) {
              status = "Review Complete";
              actionButton = "View Details";
            } else if (reviewStatus?.hasReview) {
              status = "Under Review";
              actionButton = "Continue Review";
            } else {
              status = "New";
              actionButton = "Start Review";
            }

            const submissionDate = new Date(
              review.submission_date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <ApplicationCard
                key={review.application_id}
                id={review.application_id}
                image="/images/alumni1.png"
                name={review.applicant_name}
                submissionDate={submissionDate}
                status={status}
                actionButton={actionButton}
                onAction={(id) => handleAction(id, actionButton)}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
