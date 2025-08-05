"use client";
import { ApplicationFormValues } from "./types";

interface Props {
  data: ApplicationFormValues;
  setData: (d: ApplicationFormValues) => void;
  next: () => void;
  back: () => void;
}

export default function Step2CodingProfiles({
  data,
  setData,
  next,
  back,
}: Props) {
  return (
    <div className="">
       
      <div className=" px-6 ">
         <p className="text-black mb-3">Coding Profiles</p>
        <div className="flex justify-start ">
          <div className="">
            <label htmlFor="codeforces">Codeforces</label>

            <input
              className="input  rounded p-1 shadow-gray-400 shadow"
              id="codeforces"
              value={data.codeforces}
              onChange={(e) => setData({ ...data, codeforces: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="LeetCode" className="center">
              LeetCode
            </label>
            <input
              className="input  rounded p-1 shadow-gray-400 shadow"
              id="LeetCode"
              value={data.leetcode}
              onChange={(e) => setData({ ...data, leetcode: e.target.value })}
            />
          </div>
        </div>
        <div className="flex-col mt-5">
          <label htmlFor="GitHub" className="block ">GitHub</label>
          <input
            className="input  rounded p-1 shadow-gray-400 shadow w-full "
            id="GitHub"
            value={data.github}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
        </div>
      </div>
      <div className=" bg-gray-100 py-3 mt-2">
        <div className="px-6 flex justify-between">
          <button className="bg-gray-200 p-2 px-4  rounded" onClick={back}>
            Back
          </button>
          <button
            className="btn-primary bg-[#4F46E5] p-2 px-10 rounded text-amber-50"
            onClick={next}
          >
            Next: Essay and Resume
          </button>
        </div>
      </div>
    </div>
  );
}
