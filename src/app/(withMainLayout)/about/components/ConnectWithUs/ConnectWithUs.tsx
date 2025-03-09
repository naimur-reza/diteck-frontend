import { LinkButtonWithIcon } from "@/components/common";
import { PulseButton } from "@/components/ui";
import React from "react";

const ConnectWithUs = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/about-img5.jpg)",
      }}
      className="relative bg-cover bg-center bg-no-repeat p-10 md:py-20 lg:py-40 lg:px-20 px-10 rounded-[40px] m-2"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-[40px]" />

      <div className="relative container mx-auto flex flex-col gap-2 items-center ">
        <PulseButton buttonText="Connect with us" color="text-white" />
        <h2 className="text-white text-[40px] md:text-[60px] lg:text-[80px] font-medium text-center max-w-[90%] lg:max-w-[70%] leading-16 lg:leading-24 my-5 lg:my-10">
          We are committed to delivering only the best
        </h2>
        <LinkButtonWithIcon
          invertedBorder={false}
          link="/contact"
          text="Get Started"
          textColor="text-white"
        />
      </div>
    </section>
  );
};

export default ConnectWithUs;
