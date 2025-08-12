import React from "react";
import { testimonials } from "@/data/landing";
import type { Testimonial } from "@/types/landing";
import Image from "next/image";

const TestimonialCard: React.FC<Testimonial> = ({
  photo,
  name,
  role,
  description,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-sm flex flex-col justify-between space-y-6">
    <p className="text-gray-700">{description}</p>

    <div className="flex items-center gap-4 mt-auto">
      <img
        src={photo}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <p className="font-medium text-black text-lg">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const AlumniTestimonials = () => {
  return (
    <section className="bg-[#F9FAFB] py-16" id="testimonial">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Hear from Our Alumni
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniTestimonials;
