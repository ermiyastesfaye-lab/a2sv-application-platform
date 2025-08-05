"use client";

interface Props {
  step: number;
}

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Coding Profiles" },
  { id: 3, label: "Essays & Resume" },
];

export default function Progress({ step }: Props) {
  return (
    <div className="mb-6 mx">
      <div className="w-full h-1 rounded px-6 mb-4">
        <div
          className="h-2 bg-[#4F46E5] rounded transition-all duration-300"
          style={{ width: `${(step ) * (100/3)}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-4 px-6">
        {steps.map((s) => (
          <div key={s.id} className="flex text-center text-sm font-medium ">
            <div
              className={`rounded-full w-8 h-8 mx-2 flex items-center justify-center 
                ${
                  step === s.id
                    ? "bg-[#4F46E5] text-black"
                    : "bg-gray-300 text-black"
                }`}
            >
              {s.id}
            </div>
            <div
              className={`mt-1 ${
                step === s.id ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
}
