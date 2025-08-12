"use client";
import Image from "next/image";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./components/Badge";
import { Card, CardContent } from "./components/Card";
import {
  useGetApplicantsQuery,
  useGetReviewersQuery,
  useAssignReviewerMutation,
} from "@/lib/redux/api/managerApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubItem,
  DropdownMenuTrigger,
} from "./components/DropdownMenu";
import { ChevronDownIcon } from "./components/Icons";

import PaginationControls from "./components/PaginationControls";

const APPLICANTS_PER_PAGE = 10;

const DashboardMainSection = (): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, isLoading, isError, error, refetch } = useGetApplicantsQuery({
    page: currentPage,
    limit: APPLICANTS_PER_PAGE,
  });
  const { data: acceptedData } = useGetApplicantsQuery({
    page: currentPage,
    limit: APPLICANTS_PER_PAGE,
    status: "accepted",
  });
  const { data: underReviewData } = useGetApplicantsQuery({
    page: currentPage,
    limit: APPLICANTS_PER_PAGE,
    status: "pending_review",
  });
  const router = useRouter();
  const {
    data: reviewersData,
    isLoading: reviewersLoading,
    isError: reviewersError,
  } = useGetReviewersQuery({ page: 1, limit: 10 });
  const [assignReviewer, { }] =
    useAssignReviewerMutation();
  if (error) {
    console.log(error);
  }
  const metricCards = [
    { title: "Total Applications", value: data?.data.total_count },
    { title: "Under Review", value: acceptedData?.data.total_count },

    { title: "Accepted", value: underReviewData?.data.total_count },
  ];

  const teamPerformance = [
    {
      name: "Jane R.",
      reviews: "12 Reviews",
      assigned: "3 Assigned / Avg. 2.5 days",
    },
    {
      name: "Mike R.",
      reviews: "8 Reviews",
      assigned: "5 Assigned / Avg. 3.1 days",
    },
  ];
  if (isError) {
    console.warn("Error loading applicants:", error);
  }

  const handleAssign = async (applicationId: string, reviewerId: string) => {
    try {
      await assignReviewer({
        application_id: applicationId,
        reviewer_id: reviewerId,
      }).unwrap();
      refetch();
    } catch (e) {
      console.error("Failed to assign reviewer", e);
    }
  };

  return (
    <div className="flex justify-center">
      <section className="w-3/4 py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 items-center">
          {metricCards.map((card, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-5">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-gray-500">
                    {card.title}
                  </div>
                  <div className="text-3xl font-semibold text-gray-900">
                    {card.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Applications Table */}
          <Card className="shadow-lg flex-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  All Applications
                </h2>
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                  <span className="text-base font-normal text-black mr-1">
                    Filter by Status
                  </span>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">APPLICANT</TableHead>
                    <TableHead className="w-36">SUBMITTED</TableHead>
                    <TableHead className="w-48">ASSIGNED REVIEWER</TableHead>
                    <TableHead className="w-40">STATUS</TableHead>
                    <TableHead className="w-32 text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        {...({ colSpan: 5 } )}
                        className="text-center"
                      >
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell
                        {...({ colSpan: 5 } )}
                        className="text-center text-red-500"
                      >
                        Error loading applicants
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.data?.applications?.map((app) => (
                      <TableRow
                        key={app.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() =>
                          router.push(
                            `/dashboard/manager/applications/${app.id}`
                          )
                        }
                      >
                        <TableCell className="font-medium text-gray-900">
                          {app.applicant_name}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {`Oct 26, 2023`}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                              app.assigned_reviewer_name?.trim()
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {app.assigned_reviewer_name?.trim()
                              ? app.assigned_reviewer_name
                              : "Unassigned"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              app.status === "in_progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : app.status === "pending_review"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : app.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : app.status === "submitted"
                                ? "bg-purple-100 text-purple-800"
                                : app.status === "accepted"
                                ? "bg-emerald-100 text-emerald-800"
                                : ""
                            }
                          >
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className="text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700">
                              Actions
                              <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-44">
                              <DropdownMenuItem>Review</DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/dashboard/manager/applications/${app.id}`
                                  )
                                }
                              >
                                View Details
                              </DropdownMenuItem>

                              <DropdownMenuSub trigger="Assign to Reviewer">
                                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                  {reviewersLoading
                                    ? "Loading reviewers..."
                                    : reviewersError
                                    ? "Failed to load reviewers"
                                    : "Select a reviewer"}
                                </div>
                                {reviewersData?.data?.reviewers?.length
                                  ? reviewersData.data.reviewers.map(
                                      (reviewer) => (
                                        <DropdownMenuSubItem
                                          key={reviewer.id}
                                          icon={
                                            <img
                                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                reviewer.full_name
                                              )}&background=EEF2FF&color=3730A3&size=32`}
                                              alt={reviewer.full_name}
                                              className="w-4 h-4 rounded-full"
                                              
                                              
                                            />
                                          }
                                          onClick={() =>
                                            handleAssign(app.id, reviewer.id)
                                          }
                                        >
                                          {reviewer.full_name}
                                        </DropdownMenuSubItem>
                                      )
                                    )
                                  : !reviewersLoading && (
                                      <div className="px-4 py-2 text-sm text-gray-500">
                                        No reviewers available
                                      </div>
                                    )}
                              </DropdownMenuSub>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {data?.data?.total_count && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    data.data.total_count / APPLICANTS_PER_PAGE
                  )}
                  onPageChange={setCurrentPage}
                />
              )}
            </CardContent>
          </Card>

          {/* Team Performance Card */}
          <Card className="w-full lg:w-96 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Team Performance
              </h2>

              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div
                    key={index}
                    className={`${
                      index > 0 ? "pt-4 border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-black">
                        {member.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {member.reviews}
                      </div>
                    </div>
                    <div className=" text-gray-500 text-sm">
                      {member.assigned}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DashboardMainSection;
