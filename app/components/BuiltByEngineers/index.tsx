import React from "react";

const BuildByEngineers = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Built by Engineers, for Engineers
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            A2SV is not just a program; it's a community. We're on a mission to
            identify Africa's most brilliant minds and provide them with the
            resources, mentorship, and opportunities to solve humanity's
            greatest challenges.
          </p>
        </div>

        <div className="flex-1 w-full">
          <img
            src="/images/built-by-engineers.jpg"
            alt="Built by Engineers"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BuildByEngineers;
