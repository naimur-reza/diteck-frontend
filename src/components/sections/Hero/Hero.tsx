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
      }}
      className=" relative  z-30"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2  in-h-screen pt-44 pb-14 ">
        <div className="absolute inset-0 -z-50 bg-black/20" />
        <div className="relative aspect-square md:h-[550px] md:w-[95%] ">
          <Image
            src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/h5_img-1.jpg"
            alt="hero_image"
            className="object-cover rounded-3xl"
            fill
          />
        </div>
        <section className="pt-10 md:pt-0 text-center md:text-start">
          <div className="flex flex-col gap-4 md:grid md:items-center">
            <div className="col-span-2 flex justify-center md:block">
              <PulseButton
                color="text-white border-"
                buttonText="Hear from customer"
              />
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-6">
                <h2 className={`section-title px-10 md:px-0`}>
                  The digital agency built for brands
                </h2>

                <p className={`section-description lg:pr-20`}>
                  We’re a team of expert who’ve been delivering digital success
                  for more than a decade.
                </p>

                <LinkButtonWithIcon
                  className="justify-center md:justify-start"
                  invertedBorder={false}
                  link="/"
                  text="View Our Work"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
