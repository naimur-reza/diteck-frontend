import Image from "next/image";
import React from "react";

const WULeftSideBanner = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[1000px]">
      {/* Background Image */}
      <Image
        src="https://i.ibb.co.com/W4kWqfN7/download.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="rounded-[20px]"
      />

      {/* Rotating Circular Text with Center Logo */}
      <div className="absolute top-[50px] right-[50px] w-[150px] h-[150px] flex items-center justify-center bg-white rounded-full">
        {/* Rotating Circle Text */}
        <svg
          className="absolute w-full h-full animate-spin-slow"
          viewBox="0 0 200 200"
        >
          <defs>
            <path
              id="circle"
              d="M 100, 100
               m -75, 0
               a 75,75 0 1,1 150,0
               a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text fill="#000" fontSize="22" fontWeight="bold">
            <textPath href="#circle" startOffset="0%">
              BUSINESS DEVELOPMENT • IT SOLUTION •
            </textPath>
          </text>
        </svg>

        {/* Center Logo */}
        <div className="relative w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center shadow-lg">
          <Image
            src="https://i.ibb.co.com/JNKSBDw/project-logo-2.png"
            alt="Center Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WULeftSideBanner;
