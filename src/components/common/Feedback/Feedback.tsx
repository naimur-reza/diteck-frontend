"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PulseButton } from "@/components/ui";

type TFeedback = {
  name: string;
  quote: string;
  position: string;
};
export const Feedback = ({
  buttonText,
  feedbackData,
}: {
  buttonText: string;
  feedbackData: TFeedback[];
}) => {
  return (
    <div
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_bg-4.png")`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      className=" relative text-center p-6 min-h-[600px] md:min-h-[700px] flex   w-full rounded-[20px] lg:rounded-[50px]"
    >
      <div className="absolute inset-0   w-full bg-gradient-to-t from-white/60 via-transparent to-transparent  rounded-[20px] lg:rounded-[50px]"></div>
      <div className=" flex  flex-col items-center justify-center w-full">
        <PulseButton buttonText={buttonText} />
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          className="pb-96  flex flex-col items-center justify-center  max-w-6xl w-full mx-auto md:h-[350px] lg:h-[400px] mt-[40px]"
        >
          {feedbackData?.map((feedback, index) => (
            <SwiperSlide key={index}>
              <blockquote className="text-[28px] leading-[38px] md:text-[34px] md:leading-[45px] lg:text-[48px] lg:leading-[64px] xl:text-[60px] xl:leading-[80px] text-black font-medium">
                {feedback.quote}
              </blockquote>

              <div className="flex justify-center gap-x-4  items-center mt-[40px]">
                <p className=" text-lg font-semibold">{feedback.name}</p>
                <span className="bg-black size-1 rounded-full"></span>
                <p className="text-gray-500">{feedback.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
