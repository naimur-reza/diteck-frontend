"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const userImg = [
  "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_customer-1.jpg",
  "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_customer-2.jpg",
  "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_customer-3.jpg",
];

const HeroVideo = () => {
  return (
    <div className="relative container mx-auto">
      <div className="w-full min-h-[700px] rounded-[40px]">
        <iframe
          src="https://player.vimeo.com/video/1039504919?muted=1&autoplay=1&loop=1&background=1&app_id=122963"
          className="min-w-full h-[800px] rounded-[40px]"
        />
      </div>

      <div className="absolute bottom-[6px] z-10 max-w-[400px]">
        <div className="hero-video-left"></div>
        <div className="hero-video-right"></div>
        <div className="bg-white pb-5 pl-8 pt-[50px] rounded-tr-4xl rounded-bl-[25px] h-15 flex items-center gap-4 w-full">
          <div className="flex items-center">
            {userImg.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt=""
                width={50}
                height={50}
                className="rounded-full -ml-3"
              />
            ))}
          </div>
          <div>
            <span className="text-[42px] text-accent font-bold">
              <CountUp start={0.0} end={Number(1.7)} />
              M+
            </span>
          </div>
          <div className="max-w-[100px] flex items-center justify-end">
            <span className="text-sm text-light">satisfied customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;
