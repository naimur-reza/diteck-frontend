import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    // <div className="min-h-[130vh] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
    <section className="min-h-[120vh] max-h-[1200px] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
      <div className="container mx-auto px-5">
        <div className="pt-[200px] pb-[100px]">
          <h1 className="flex items-center flex-wrap text-[115px] font-bold">
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
    </section>
  );
};

export default Hero;
