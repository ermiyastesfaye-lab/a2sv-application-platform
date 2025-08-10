import ApplyButton from "./ApplyButton";

const CTASection = () => {
  return (
    <section className="bg-indigo-700 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-6 text-center">
        <h2 className="text-3xl font-extrabold text-white">
          Ready to change your life?
        </h2>

        <p className="text-indigo-200 max-w-[480px]">
          The next application cycle is now open. Take the first step towards
          your dream career.
        </p>

        <ApplyButton />
      </div>
    </section>
  );
};

export default CTASection;
