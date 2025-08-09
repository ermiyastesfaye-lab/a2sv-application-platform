"use client";
import { useEffect, useState } from "react";
import { StartApplicationForm } from "../../types";
import Step1 from "./components/Step1PersonalInfo";
import Step2 from "./components/Step2CodingProfiles";
import Step3EssaysResume from "./components/Step3EssaysResume";
import Progress from "./components/Progress";
import {
  useGetApplicationDetailsQuery,
  useUpdateApplicationMutation,
} from "@/lib/redux/api/clientApi";
import { useParams, useRouter } from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";
import ErrorPage from "@/app/(features)/dashboard/applicant/components/ErrorPage";


export default function EditApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StartApplicationForm | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;


  const {
    data: existingApplication,
    isLoading,
    isError,
    error,
  } = useGetApplicationDetailsQuery(applicationId, {
    skip: !applicationId,
    refetchOnMountOrArgChange: true,
  });

  
  const [updateApplication, { isLoading: isUpdating }] =
    useUpdateApplicationMutation();

  
  useEffect(() => {
    if (existingApplication?.data) {
      setFormData({
        student_id: existingApplication.data.student_id,
        school: existingApplication.data.school,
        degree: existingApplication.data.degree,
        country: existingApplication.data.country,
        codeforces_handle: existingApplication.data.codeforces_handle,
        leetcode_handle: existingApplication.data.leetcode_handle,
        essay_why_a2sv: existingApplication.data.essay_why_a2sv,
        essay_about_you: existingApplication.data.essay_about_you,
        resume: existingApplication.data.resume_url as unknown as File,
      });
      setResumeUrl(existingApplication.data.resume_url);
    }
  }, [existingApplication]);

  const handleUpdate = async (body: FormData) => {
    try {
      await updateApplication({ id: applicationId, body }).unwrap();
      setUpdateSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/applicant");
      }, 1500);
    } catch (error) {
      console.error("Update failed:", error);
      alert((error as any)?.data?.message || "Update failed. Please try again.");
    }
  };

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  // Loading states
  if (isLoading || !formData) {
    return <LoadingPage message="Loading application data..." />;
  }

  if (isUpdating && !updateSuccess) {
    return <LoadingPage message="Updating application..." />;
  }

  if (updateSuccess) {
 return (
   <div className="flex flex-col items-center justify-center min-h-[200px] text-center p-6">
     <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-md max-w-sm">
       <h3 className="text-lg font-semibold mb-2">Application Updated </h3>
       <p className="text-sm">
         Your application has been successfully updated. Redirecting you back to
         your dashboard...
       </p>
     </div>
   </div>
 );
  }

  if (isError) {
    return (
      <ErrorPage
        message={error?.toString() || "Failed to load application"}

      />
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded mb-40 pt-6 text-[#374151]">
      <h2 className="text-center text-xl font-semibold mb-4 text-black">
        Edit Application Form
      </h2>
      <Progress step={step} />

      {step === 1 && (
        <Step1 data={formData} setData={setFormData} next={next} />
      )}
      {step === 2 && (
        <Step2 data={formData} setData={setFormData} next={next} back={back} />
      )}
      {step === 3 && (
        <Step3EssaysResume
          data={formData}
          setData={setFormData}
          back={back}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
          resumeUrl={resumeUrl}
        />
      )}
    </div>
  );
}