
"use client";
import { useForm } from "react-hook-form";
import { StartApplicationForm } from "./types";

interface Props {
  data: StartApplicationForm;
  setData: (d: StartApplicationForm) => void;
  next: () => void;
}

export default function Step1PersonalInfo({ data, setData, next }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartApplicationForm>({
    defaultValues: {
      student_id: data.student_id,
      school: data.school,
      degree: data.degree,
      country: data.country, 
    },
  });

  const onSubmit = (formData: StartApplicationForm) => {
    setData({ ...data, ...formData });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="px-6 mb-4">
        <p className="text-black mb-3">Personal Information</p>

        {/* Row 1: ID + School */}
        <div className="flex mb-4 gap-4">
          {/* ID Number */}
          <div>
            <label htmlFor="student_id">ID Number</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow-xs"
              id="student_id"
              {...register("student_id", { required: "ID Number is required" })}
            />
            {errors.student_id && (
              <p className="text-red-500 text-sm">
                {errors.student_id.message}
              </p>
            )}
          </div>

          {/* School / University */}
          <div>
            <label htmlFor="university">School / University</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow-xs"
              id="university"
              {...register("school", {
                required: "University is required",
              })}
            />
            {errors.school && (
              <p className="text-red-500 text-sm">{errors.school.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Degree + Country */}
        <div className="flex mb-4 gap-4">
          {/* Degree Program */}
          <div>
            <label htmlFor="degree">Degree Program</label>
            <input
              className="input w-full rounded p-1 shadow-gray-400 shadow-xs"
              id="degree"
              {...register("degree", { required: "Degree is required" })}
            />
            {errors.degree && (
              <p className="text-red-500 text-sm">{errors.degree.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country">Country</label>
            <input
              className="input w-full rounded p-1 shadow-gray-400 shadow-xs"
              id="country"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end bg-gray-100 py-3 mt-2">
        <button
          type="submit"
          className="bg-[#4F46E5] p-1 rounded px-10 text-white"
        >
          Next: Coding Profiles
        </button>
      </div>
    </form>
  );
}
