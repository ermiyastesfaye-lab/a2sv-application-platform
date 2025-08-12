import React from "react";
import StartButton from "./startApplicationbtn";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundPosition: "center 50%",
      }}
      className="relative h-[486px] flex items-center bg-no-repeat 
                 sm:bg-[length:120%] bg-cover"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 127, 255, 0.17)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-6xl px-4 mx-auto  text-white space-y-6 text-center sm:text-left">
        <div className="mx-auto xl:pr-100">
          <h1
            className="font-extrabold tracking-[-1.5px] 
                         text-4xl md:text-5xl lg:text-6xl max-w-3xl"
          >
            Forge Your Future in Tech
          </h1>
          <h3 className="font-medium text-base md:text-lg lg:text-xl max-w-2xl mt-4">
            Join an elite community of Africa&apos;s brightest minds, and get
            fast-tracked to a software engineering career at the world&apos;s leading
            tech companies.
          </h3>
          <StartButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
