"use client";
import { StartApplicationForm } from "./types";
import { useForm } from "react-hook-form";
import { useCreateApplicationMutation } from "@/lib/redux/api/clientApi";
import { useRouter } from "next/navigation";

interface Props {
  data: StartApplicationForm;
  setData: (d: StartApplicationForm) => void;
  back: () => void;
}

export default function Step3EssaysResume({ data, setData, back }: Props) {
  const [startApplication, { isLoading }] = useCreateApplicationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StartApplicationForm>({ defaultValues: data });

  const router = useRouter();

  const resumeFile = watch("resume");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setData({ ...data, resume: file });
    }
  };

  const onSubmit = async () => {
    if (!data.resume) {
      alert("Please upload your resume.");
      return;
    }
    
    if(typeof data?.resume !== "string"){
       if (!data.resume.name.endsWith(".pdf")) {
         alert("Only PDF files are accepted for resumes.");
         return;
       }
       const maxSize = 5 * 1024 * 1024;
       if (data.resume.size > maxSize) {
         alert("Resume file size must be less than 5MB");
         return;
       }
    }

    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("school", data.school);
    formData.append("degree", data.degree);
    formData.append("student_id", data.student_id);
    formData.append("leetcode_handle", data.leetcode_handle);
    formData.append("codeforces_handle", data.codeforces_handle);
    formData.append("essay_why_a2sv", data.essay_why_a2sv);
    formData.append("essay_about_you", data.essay_about_you);
    formData.append("country", data.country);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await startApplication(formData).unwrap();
      alert("Application submitted successfully!");
      router.push("/dashboard/applicant");
    } catch (error) {
      alert("Submission failed.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <label className="block text-sm font-medium mb-1">Resume</label>
          <div className="flex justify-between items-center">
            <label className="text-sm">Upload Resume</label>
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
            <p className="text-sm mt-1">{data.resume.name}</p>
          ) : (
            <p className="text-red-500 text-sm mt-1">*no file chosen</p>
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
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}
