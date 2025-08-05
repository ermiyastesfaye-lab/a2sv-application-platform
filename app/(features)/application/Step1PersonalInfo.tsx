"use client";
import { useForm } from "react-hook-form";
import { ApplicationFormValues } from "./types";

interface Props {
  data: ApplicationFormValues;
  setData: (d: ApplicationFormValues) => void;
  next: () => void;
}

export default function Step1PersonalInfo({ data, setData, next }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    defaultValues: {
      idNumber: data.idNumber,
      university: data.university,
      degree: data.degree,
    },
  });

  const onSubmit = (formData: ApplicationFormValues) => {
    setData({ ...data, ...formData });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="px-6 mb-4">
        <p className="text-black mb-3">Personal Information</p>
        <div className="flex mb-4 gap-4">
          {/* ID Number */}
          <div>
            <label htmlFor="idNumber">ID Number</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow-xs"
              id="idNumber"
              {...register("idNumber", { required: "ID Number is required" })}
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm">{errors.idNumber.message}</p>
            )}
          </div>

          {/* School / University */}
          <div>
            <label htmlFor="university">School / University</label>
            <input
              className="input rounded p-1 shadow-gray-400 shadow-xs"
              id="university"
              {...register("university", {
                required: "University is required",
              })}
            />
            {errors.university && (
              <p className="text-red-500 text-sm">
                {errors.university.message}
              </p>
            )}
          </div>
        </div>

        {/* Degree Program */}
        <label htmlFor="degree">Degree Program</label>
        <input
          className="w-full input rounded p-1 shadow-gray-400 shadow-xs"
          id="degree"
          {...register("degree", { required: "Degree is required" })}
        />
        {errors.degree && (
          <p className="text-red-500 text-sm">{errors.degree.message}</p>
        )}
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
