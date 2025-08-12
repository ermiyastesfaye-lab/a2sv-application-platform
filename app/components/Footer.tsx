import Image from "next/image";
import React from "react";
interface ColProps {
  title: string;
  text1: string;
  text2: string;
}

const Col = ({ title, text1, text2 }: ColProps) => {
  return (
    <div className="flex flex-col gap-3 mx-4 lg:mx-8 xl:mx-12 2xlg:mx-16">
      <h3 className="text-[#ffffffec]">{title}</h3>
      <p>{text1}</p>
      <p>{text2}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-sm font-light text-[#ffffff96] mt-auto bg-[#1f2937] p-8">
      <div className="flex justify-center">
        <div>
          <Image width={100} height={100} className="h-10" src="/a2svlogo(white).png" alt="A2SV Logo"  />
          <p className="my-4">
            Preparing Africa&apos;s top tech talent for global opportunities
          </p>
        </div>
        <Col
          title="SOLUTIONS"
          text1="Student Training"
          text2="Corporate Partnership"
        />
        <Col title="SUPPORT" text1="Contact Us" text2="FAQ" />
        <Col title="COMPANY" text1="About" text2="Blog" />
        <Col title="LEGAL" text1="Privacy" text2="Terms" />
      </div>
      <hr className="my-4 text-[#ffffff1a] max-w-[60%] mx-auto" />
      <div className="text-center text-[#ffffff96] mb-4 mt-2">
        © {new Date().getFullYear()} A2SV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
