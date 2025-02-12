import { LinkButtonWithIcon } from "@/components/common";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(http://dev.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Header />
      <div className="flex flex-col gap-5 justify-center items-center pt-[60px] md:pt-[200px] pb-[50px] md:pb-[100px] text-center text-white">
        <div className="relative w-3/4 md:w-1/2 h-[180px] md:h-[300px] mx-auto">
          <Image
            src="https://demo2.wpopal.com/diteck/wp-content/themes/diteck/assets/images/404-img.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-accent text-[30px] md:text-[48px] lg:text-[100px] font-bold">
          Page not found
        </h3>
        <p className="text-accent text-base md:text-[24px] max-w-3/4 md:max-w-1/2 mx-auto">
          It looks like nothing was found at this location. You can either go
          back to the last page or go to HomePage .
        </p>
        <LinkButtonWithIcon
          link="/"
          text="Back to Home"
          invertedBorder={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
