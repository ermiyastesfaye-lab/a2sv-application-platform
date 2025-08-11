"use client";
import React from "react";
import Bar1 from "./components/bar1";
import Bar2 from "./components/bar2";
import DonutChart from "./components/pieChar";
import { useGetanalyticsQuery } from "@/lib/redux/api/analyticsApi";
import LoadingPage from "@/app/components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

const page = () => {
  const { data, error, isLoading } = useGetanalyticsQuery();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage/>;
  }
  if (!data) {
    return <></>;
  }

  console.log(data.data);
  const {
    acceptance_rate,
    application_funnel,
    average_review_time_days,
    country_distribution,
    school_distribution,
    total_applicants,
  } = data.data;
  return (
    <div className="px-50 p-5 bg-gray-100 text-[#6B7280] ">
      <div>
        <h1 className="text-2xl font-bold text-black">Application Analytics</h1>
        <p> Insights for the G7 November Intake</p>
      </div>

      <div className="flex gap-2 justify-around w-ful mt-4 ">
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Total Applicants</p>
          <h1 className="font-bold text-2xl text-black">{total_applicants}</h1>
        </div>
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Acceptance Rate</p>
          <h1 className="font-bold text-2xl  text-black">{acceptance_rate}</h1>
        </div>
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Avg Review Time</p>
          <h1 className="font-bold text-2xl  text-black">{average_review_time_days}</h1>
        </div>
      </div>
      <div className="flex gap-4 mt-5  ">
        <div className="rounded-xl bg-white shadow-xl p-2 w-full">
          <div className=" px-5">
            <h2 className="font-bold text-black">Application Funnel</h2>
            <p>
              This chart visualize the application journey form submission to
              acceptance
            </p>
          </div>
          <div className="px-2 mb-50">
            <Bar1
              acceptance_rate={acceptance_rate}
              application_funnel={application_funnel}
            />
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-xl p-2 w-full">
          <div className="px-5">
            <h2 className="font-bold text-black">University Distribution++</h2>
            <p>Breakdown of applicants by their university</p>
          </div>

          <div className="px-2  pt-2">
            <DonutChart school_distribution={school_distribution} />
          </div>
        </div>
      </div>
      <div className="rounded bg-white shadow-xl p-2 mt-3">
        <div className="mb-5 px-5">
          <h2 className="font-bold text-black">GeoGraphic Distribution</h2>
          <p>shows the number of applicant from each country</p>
        </div>

        <Bar2 country_distribution={country_distribution} />
      </div>
    </div>
  );
};

export default page;
