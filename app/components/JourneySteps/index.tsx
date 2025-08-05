import { journeySteps } from "@/data/landing";
import type { JourneyStep } from "@/types/landing";
import React from "react";

const StepCard: React.FC<JourneyStep> = ({ logo, phase, description }) => (
  <div className="p-6 w-full max-w-sm flex gap-4">
    <img
      src={logo}
      alt={phase}
      className="h-12 w-12 object-contain flex-shrink-0"
    />

    <div className="flex flex-col">
      <div className="font-semibold text-lg">{phase}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const JourneySteps: React.FC = () => {
  return (
    <section className="bg-white py-28 text-black">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold">
            Your Journey to Silicon Valley
          </h2>
          <p className="text-gray-600">
            A proven path from learning to leadership.
          </p>
        </div>
        <div className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {journeySteps.map((step) => (
            <StepCard key={step.phase} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySteps;
