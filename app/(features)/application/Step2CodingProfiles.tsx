"use client";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    defaultValues: {
      codeforces: data.codeforces,
      leetcode: data.leetcode,
      github: data.github,
    },
  });

  const onSubmit = (formData: ApplicationFormValues) => {
    setData({ ...data, ...formData });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6">
        <p className="text-black mb-3">Coding Profiles</p>
        <div className="flex justify-start gap-4">
          {/* Codeforces */}
          <div>
            <label htmlFor="codeforces">Codeforces</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow"
              id="codeforces"
              {...register("codeforces", {
                required: "Codeforces username is required",
              })}
            />
            {errors.codeforces && (
              <p className="text-red-500 text-sm">
                {errors.codeforces.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="leetcode">LeetCode</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow"
              id="leetcode"
              {...register("leetcode", {
                required: "LeetCode username is required",
              })}
            />
            {errors.leetcode && (
              <p className="text-red-500 text-sm">
                {errors.leetcode.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex-col mt-5">
          <label htmlFor="github" className="block">
            GitHub
          </label>
          <input
            className="input rounded p-1 shadow-gray-400 shadow w-full"
            id="github"
            {...register("github", {
              required: "GitHub username is required",
            })}
          />
          {errors.github && (
            <p className="text-red-500 text-sm">{errors.github.message}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-100 py-3 mt-2">
        <div className="px-6 flex justify-between">
          <button type="button" className="bg-gray-200 p-2 px-4 rounded" onClick={back}>
            Back
          </button>
          <button
            type="submit"
            className="btn-primary bg-[#4F46E5] p-2 px-10 rounded text-amber-50"
          >
            Next: Essay and Resume
          </button>
        </div>
      </div>
    </form>
  );
}
