"use client";

import React, { JSX } from "react";
import { Badge } from "./components/Badge";
import { Card, CardContent } from "./components/Card";
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
import { ChevronDownIcon, UserIcon } from "./components/Icons";

const DashboardMainSection = (): JSX.Element => {
  const metricCards = [
    { title: "Total Applications", value: "1,204" },
    { title: "Under Review", value: "750" },
    { title: "Interview Stage", value: "250" },
    { title: "Accepted", value: "82" },
  ];

  // Data for applications table
  const applications = [
    {
      applicant: "Abel Tadesse",
      submitted: "Oct 26, 2023",
      reviewer: "Jane R.",
      status: { label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
    },
    {
      applicant: "Bethlehem Tadesse",
      submitted: "Oct 25, 2023",
      reviewer: "Not Assigned",
      status: { label: "New", color: "bg-blue-100 text-blue-800" },
    },
  ];

  // Data for team performance
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

  return (
    <div className="flex justify-center">
      <section className="w-3/4 py-8 px-4">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-center">
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
                  {applications.map((application, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-900">
                        {application.applicant}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {application.submitted}
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md">
                          <span className="text-sm text-gray-600">
                            {application.reviewer}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={application.status.color}>
                          {application.status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700">
                            Actions
                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-44">
                            <DropdownMenuItem>Review</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSub trigger="Assign to Reviewer">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                Search for a reviewer
                              </div>
                              <DropdownMenuSubItem
                                icon={
                                  <UserIcon className="w-4 h-4 text-gray-400" />
                                }
                                onClick={() =>
                                  console.log("Assigned to Abel Tadesse")
                                }
                              >
                                Abel Tadesse
                              </DropdownMenuSubItem>
                              <DropdownMenuSubItem
                                icon={
                                  <UserIcon className="w-4 h-4 text-gray-400" />
                                }
                                onClick={() =>
                                  console.log("Assigned to Alemu Messele")
                                }
                              >
                                Alemu Messele
                              </DropdownMenuSubItem>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
