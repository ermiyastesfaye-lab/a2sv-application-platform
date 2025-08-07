"use client";
import { useState } from "react";
import { ApplicationFormValues } from "./types";
import { useForm } from "react-hook-form";
interface Props {
  data: ApplicationFormValues;
  setData: (d: ApplicationFormValues) => void;
  back: () => void;
}

export default function Step3EssaysResume({ data, setData, back }: Props) {
  const [submitting, setSubmitting] = useState(false);
const {
register,
handleSubmit,
formState: { errors },
setValue,
watch,
} = useForm<ApplicationFormValues>({
defaultValues: data,
});
 const resumeFile = watch("resume");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData({ ...data, resume: file });
  };
  
  const onsubmit = async (formData: ApplicationFormValues) => {
    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }
    setSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append("resume", data.resume!);
    formDataObj.append("json", JSON.stringify({ ...data, resume: undefined }));

    try {
      const res = await fetch("/api/apply", {
        //this should replaced by real api in integration time
        method: "POST",
        body: formDataObj,
      });

      if (!res.ok) throw new Error("Submission failed");
      alert("Application submitted!");
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="px-6">
        <p className="text-1xl font-bold mb-2 text-black"> Essays & Resume </p>
        <div className="mb-4">
          <p> Tell us about yourself</p>
          <textarea
            className="input w-full h-24   rounded  shadow-gray-400 shadow p-1"
            value={data.essay1}
            {...register("essay1", { required: "This field is required." })}
            onChange={(e) => setData({ ...data, essay1: e.target.value })}
            
          />
          {errors.essay1 && (
            <p className="text-red-500 text-sm">{errors.essay1.message}</p>
          )}
        </div>
        <div className="mb-4  border-b-neutral-400  ">
          <p className="">Why do you want to join us?</p>
          <textarea
            className="input  rounded  shadow-gray-400 shadow w-full h-24 p-1"
            value={data.essay2}
            {...register("essay2", { required: "This field is required." })}
            onChange={(e) => setData({ ...data, essay2: e.target.value })}
          />
          {errors.essay2 && (
            <p className="text-red-500 text-sm">{errors.essay2.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Resume</label>
          <div className="flex justify-between">
            <label className=" text-sm font-medium mb-1">Upload Resume</label>
            <label
              htmlFor="file-upload"
              className="bg-[#4F46E5] text-white px-4 py-2 rounded-3xl cursor-pointer"
            >
              Choose File
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
          </div>

          {data.resume ? (
            <p className="text-sm mt-1 ">{data.resume.name}</p>
          ) : (
            <p className="text-red-500 text-sm mt-1">*no file chosen</p>
          )}
        </div>
      </div>
      <div className=" bg-gray-100 py-3 mt-2">
        <div className="px-6 flex justify-between">
          <button
            className="bg-gray-200 p-2 px-4  rounded"
            onClick={back}
            disabled={submitting}
          >
            Back
          </button>
          <button
            className="btn-primary bg-[#4F46E5] p-2 px-10 rounded text-amber-50"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
