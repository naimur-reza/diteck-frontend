import Image from "next/image";
import React from "react";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  return (
    // <div className="min-h-[130vh] bg-[linear-gradient(140deg,_#BEDBEA,_#EFC7C2,_#F1ECF1)]">
    <section
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_bg-1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="pb-10"
    >
      <div className="container mx-auto px-5">
        <div className="pt-[200px] pb-[100px]">
          <h1 className="flex items-center flex-wrap text-5xl md:text-7xl lg:text-[110px] font-bold">
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
      <HeroVideo />
    </section>
  );
};

export default Hero;
