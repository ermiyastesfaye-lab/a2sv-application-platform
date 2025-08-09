'use client';
import { useState } from "react";
import { StartApplicationForm } from "./types";
import Step1 from "./Step1PersonalInfo";
import Step2 from "./Step2CodingProfiles";
import Step3 from "./Step3EssaysResume";
import Progress from "./Progress";

const defaultValues: StartApplicationForm = {
  student_id: "",
  school: "",
  degree: "",
  codeforces_handle: "",
  leetcode_handle: "",
  essay_why_a2sv: "",
  essay_about_you: "",
  country: "",
  resume: null as unknown as File, 
};

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StartApplicationForm>(defaultValues);

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
