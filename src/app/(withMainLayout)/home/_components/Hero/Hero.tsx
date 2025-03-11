import assets from "@/assets";
import { LinkButtonWithIcon } from "@/components/common";

import { PulseButton } from "@/components/ui";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${assets.background.gridBg.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "700px",
      }}
      className=" relative "
    >
      <div className="relative bg-black/50  pt-30 md:pt-44 pb-12">
        {/* gradients */}
        <div className="absolute inset-0 -z-10 bg-linear-120 from-purple-900/90  via-primary to-purple-900/90" />

        {/* contents */}
        <div className="grid grid-cols-1 md:grid-cols-2 container min-h-screen">
          <div className="relative aspect-square md:h-[550px] md:w-[95%] ">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/h5_img-1.jpg"
              alt="hero_image"
              className="object-cover rounded-3xl"
              fill
            />
          </div>
          <section className="pt-10 md:pt-20 text-center md:text-start relative z-20">
            <div className="flex flex-col gap-4 md:grid md:items-center">
              <div className="col-span-2 flex justify-center md:block">
                <PulseButton
                  color="text-white border-white/20"
                  buttonText="Hear from customer"
                />
              </div>

              <div className="col-span-3">
                <div className="flex flex-col gap-6">
                  <h2 className={`section-title px-10 md:px-0 text-white`}>
                    The digital agency built for brands
                  </h2>

                  <p
                    className={`text-lg md:text-xl font-medium text-background lg:pr-20`}
                  >
                    We’re a team of expert who’ve been delivering digital
                    success for more than a decade.
                  </p>

                  <LinkButtonWithIcon
                    textColor="text-white"
                    className="justify-center md:justify-start text-white relative"
                    invertedBorder={false}
                    link="/project"
                    text="View Our Work"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;
