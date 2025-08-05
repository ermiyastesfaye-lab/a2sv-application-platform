'use client';
import { useState } from "react";
import { ApplicationFormValues } from "./types";
import Step1 from "./Step1PersonalInfo";
import Step2 from "./Step2CodingProfiles";
import Step3 from "./Step3EssaysResume";
import Progress from "./Progress";

const defaultValues: ApplicationFormValues = {
  idNumber: "",
  university: "",
  degree: "",
  codeforces: "",
  leetcode: "",
  github: "",
  essay1: "",
  essay2: "",
  resume: null,
};

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormValues>(defaultValues);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white  shadow rounded mb-40 pt-6 text-[#374151]">
      <h2 className="text-center text-xl font-semibold mb-4 text-black ">Application Form</h2>
      <Progress step={step} />
      
      {step === 1 && <Step1 data={formData} setData={setFormData} next={next} />}
      {step === 2 && <Step2 data={formData} setData={setFormData} next={next} back={back} />}
      {step === 3 && <Step3 data={formData} setData={setFormData} back={back} />}
    </div>
  );
}
