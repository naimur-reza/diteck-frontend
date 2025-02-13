// import { LinkButtonWithIcon } from "@/components/common";
import Image from "next/image";
import React from "react";

const DownloadBrochure = () => {
  return (
    <div className="bg-[#636EDF] p-8 rounded-[20px] text-white w-full max-w-[320px] max-h-[450px]">
      <div
        className={`border border-[#636EDF4D] w-fit rounded-[10px]  font-medium text-sm md:text-lg px-4 py-1.5 flex items-center gap-2 mb-3`}
      >
        <span className="w-2 h-2 rounded-[2px]  bg-white "></span>
        Just starting out?
      </div>
      <h4 className="text-[42px] leading-10 font-medium relative z-10">
        Download a company brochure
      </h4>
      <div className="flex items-center gap-5 mt-5 relative w-full h-[250px] rounded-[20px] z-0 -top-[80px]">
        <Image
          src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/about-img2.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      {/* <LinkButtonWithIcon text="Download a company" link="/" position="end" /> */}
    </div>
  );
};

export default DownloadBrochure;
