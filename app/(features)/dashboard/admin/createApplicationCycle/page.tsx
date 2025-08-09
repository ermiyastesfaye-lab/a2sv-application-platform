import CycleForm from "@/app/components/CreateApplicationCycle";

export default function Home() {
  return (
    <section className="p-4 sm:p-12 flex justify-center">
      <div className="w-full max-w-5xl grid items-start gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            Create new cycle
          </h1>
          <p className="text-gray-500">
            Use this form to create a new cycle and assign periods.
          </p>
        </div>
        <CycleForm />
      </div>
    </section>
  );
}
