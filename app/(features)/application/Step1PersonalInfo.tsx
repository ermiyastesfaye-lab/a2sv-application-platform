"use client";
import { ApplicationFormValues } from "./types";

interface Props {
  data: ApplicationFormValues;
  setData: (d: ApplicationFormValues) => void;
  next: () => void;
}

export default function Step1PersonalInfo({ data, setData, next }: Props) {
  return (
    <div className="">
      <div className="px-6 mb-4">
         <p className="text-black mb-3">Personal Information</p>
        <div className=" flex mb-4">
          <div>
            <label htmlFor="ID Number">ID Number</label>
            <input
              className=" input  rounded p-1 shadow-gray-400 shadow-xs"
              id="ID Number"
              value={data.idNumber}
              onChange={(e) => setData({ ...data, idNumber: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="School"> School / University</label>
            <input
              className="input  rounded p-1 shadow-gray-400  shadow-xs"
              id="School"
              value={data.university}
              onChange={(e) => setData({ ...data, university: e.target.value })}
            />
          </div>
        </div>
        <label htmlFor="Degree">Degree Program</label>
        <input
          className=" w-full input  rounded p-1 shadow-gray-400 shadow-xs"
          id="Degree"
          value={data.degree}
          onChange={(e) => setData({ ...data, degree: e.target.value })}
        />
      </div>

      <div className="flex justify-end  bg-gray-100 py-3 mt-2">
        <button className="bg-[#4F46E5] p-1 rounded px-10 text-white" onClick={next}>
          Next: Coding Profiles
        </button>
      </div>
    </div>
  );
}
