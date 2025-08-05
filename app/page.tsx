import AlumniTestimonials from "./components/AlumniTestimonials";
import BuildByEngineers from "./components/BuiltByEngineers";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import JourneySteps from "./components/JourneySteps";
import LogoSection from "./components/LogoSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <LogoSection
        logos={["/images/logo-google.svg", "/images/logo-amazon.svg"]}
      />
      <JourneySteps />
      <BuildByEngineers />
      <AlumniTestimonials />
      <CTASection />
    </div>
  );
}