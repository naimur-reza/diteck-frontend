import { SectionTitle } from "@/components/common";
import Image from "next/image";
import React from "react";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  return (
    // <div className="min-h-[130vh] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
    <section className="lg:min-h-[120vh] lg:max-h-[1200px] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
      <div className="container mx-auto px-5">
        <div className="pt-[200px] pb-[100px]">
          <h1 className="flex items-center flex-wrap text-5xl md:text-7xl lg:text-[115px] font-bold">
            Finest solutions for all
            <div className="inline mx-2">
              <Image
                src="https://i.ibb.co/yBhCQt56/h1-img-deco.jpg"
                alt="Hero"
                width={250}
                height={120}
                className="align-middle rounded-md"
              />
            </div>
            challenges
          </h1>
        </div>
      </div>

      {/* Hero Video */}
      {/* <HeroVideo /> */}

      <div>
        <div className="container mx-auto pb-5">
          <SectionTitle
            buttonText="Who you are"
            description="We’re a team of expert designers, web developers and marketers who’ve
          been delivering digital success for more than a decade. We excel at
          marketing websites, innovative web apps and mobile applications."
            title="Your partners for digital success"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
