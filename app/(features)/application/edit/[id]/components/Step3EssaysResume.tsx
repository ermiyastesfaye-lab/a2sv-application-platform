"use client";
import { StartApplicationForm } from "../../../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface Props {
  data: StartApplicationForm;
  setData: (d: StartApplicationForm) => void;
  back: () => void;
 
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  resumeUrl?: string | null;
}

export default function Step3EssaysResume({
  data,
  setData,
  back,
  onSubmit,
  isLoading = false,
  resumeUrl
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StartApplicationForm>({ defaultValues: data });

    useEffect(() => {
        reset(data);
      }, [data, reset]);
  const [replacing, setReplacing] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setData({ ...data, resume: file });
    }
  };

   const handleFormSubmit = async () => {
     const formData = new FormData();

     if (data.resume instanceof File) {
       if (!data.resume.name.endsWith(".pdf")) {
         alert("Only PDF files are accepted for resumes.");
         return;
       }

       const maxSize = 5 * 1024 * 1024;
       if (data.resume.size > maxSize) {
         alert("Resume file size must be less than 5MB");
         return;
       }

       formData.append("resume", data.resume);
     }

     formData.append("school", data.school);
     formData.append("degree", data.degree);
     formData.append("student_id", data.student_id);
     formData.append("leetcode_handle", data.leetcode_handle);
     formData.append("codeforces_handle", data.codeforces_handle);
     formData.append("essay_why_a2sv", data.essay_why_a2sv);
     formData.append("essay_about_you", data.essay_about_you);
     formData.append("country", data.country);

     await onSubmit(formData);
   };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="px-6">
        <p className="text-1xl font-bold mb-2 text-black">Essays & Resume</p>

        <div className="mb-4">
          <p>Tell us about yourself</p>
          <textarea
            className="input w-full h-24 rounded shadow p-1"
            value={data.essay_about_you}
            {...register("essay_about_you", {
              required: "This field is required.",
            })}
            onChange={(e) =>
              setData({ ...data, essay_about_you: e.target.value })
            }
          />
          {errors.essay_about_you && (
            <p className="text-red-500 text-sm">
              {errors.essay_about_you.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <p>Why do you want to join us?</p>
          <textarea
            className="input w-full h-24 rounded shadow p-1"
            value={data.essay_why_a2sv}
            {...register("essay_why_a2sv", {
              required: "This field is required.",
            })}
            onChange={(e) =>
              setData({ ...data, essay_why_a2sv: e.target.value })
            }
          />
          {errors.essay_why_a2sv && (
            <p className="text-red-500 text-sm">
              {errors.essay_why_a2sv.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Resume</label>

          {!replacing && resumeUrl && (
            <div className="flex items-center justify-end gap-4">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm border-indigo-400 p-2 border-1 rounded hover:bg-indigo-100"
              >
                View resume
              </a>
              <button
                type="button"
                className="text-sm rounded bg-indigo-500 text-white p-2 hover:bg-indigo-700"
                onClick={() => setReplacing(true)}
              >
                Replace Resume
              </button>
            </div>
          )}

          {replacing && (
            <>
              <div className="flex justify-between items-center">
                <label className="text-sm">Upload New Resume</label>
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
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
              {data.resume instanceof File ? (
                <p className="text-sm mt-1">{data.resume.name}</p>
              ) : (
                <p className="text-red-500 text-sm mt-1">*no file chosen</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-100 py-3 mt-2">
        <div className="px-6 flex justify-between">
          <button
            className="bg-gray-200 p-2 px-4 rounded"
            type="button"
            onClick={back}
            disabled={isLoading}
          >
            Back
          </button>
          <button
            className="bg-[#4F46E5] p-2 px-10 rounded text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Editing..." : "Edit"}
          </button>
        </div>
      </div>
    </form>
  );
}
