'use client'
import React from "react";
import Bar1 from "./bar1";
import Bar2 from "./bar2";
import DonutChart from "./pieChar";
const page = () => {
  return (
    <div className="px-50 p-5 bg-gray-100 text-[#6B7280] ">
      <div>
        <h1 className="text-2xl font-bold text-black">Application Analytics</h1>
        <p> Insights for the G7 November Intake</p>
      </div>

      <div className="flex gap-2 justify-around w-ful mt-4 ">
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Total Applicants</p>
          <h1 className="font-bold text-2xl text-black">1204</h1>
        </div>
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Acceptance Rate</p>
          <h1 className="font-bold text-2xl  text-black">6.8%</h1>
        </div>
        <div className="bg-white  py-5 px-5 w-full shadow-1xl rounded-xl">
          <p>Avg Review Time</p>
          <h1 className="font-bold text-2xl  text-black">3.2 Days</h1>
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
          <div className="px-2 mb-50" >
            <Bar1/>
          </div>
          
        </div>
        <div className="rounded-xl bg-white shadow-xl p-2 w-full">
            <div className="px-5">
                 <h2 className="font-bold text-black">University Distribution++</h2>
          <p>Breakdown of applicants by their university</p>
            </div>
         
          <div className="px-2  pt-2" >
            <DonutChart/>
          </div>
        </div>
      </div>
      <div className="rounded bg-white shadow-xl p-2 mt-3">
        <div className="mb-5 px-5"><h2 className="font-bold text-black">GeoGraphic Distribution</h2>
        <p>shows the number of applicant from each country</p></div>
        
        <Bar2/>
      </div>
    </div>
  );
};

export default page;
