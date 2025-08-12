import Image from "next/image";
import React from "react";

interface LogoSectionProps {
  logos: string[];
}

const LogoSection: React.FC<LogoSectionProps> = ({ logos }) => {
  return (
    <section className="bg-gray-100 py-12 max-">
      <div className="max-w-6xl mx-auto px-12">
        <div className="flex items-center gap-20">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
