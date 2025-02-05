import { SectionTitle } from "@/app/components/common";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    // <div className="min-h-[130vh] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
    <div className="min-h-[120vh] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
      <div className="container mx-auto px-5">
        <div className="flex flex-col justify-center min-h-screen">
          <h1 className="flex items-center flex-wrap text-[120px] font-bold">
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
    </div>
  );
};

export default Hero;
