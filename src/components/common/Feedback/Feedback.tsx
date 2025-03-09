"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { PulseButton } from "@/components/ui";
import type { TReview } from "@/types";
import "swiper/css";
import "swiper/css/pagination";

export const Feedback = ({
  buttonText,
  feedbackData,
}: {
  buttonText: string;
  feedbackData: TReview[];
}) => {
  return (
    <div
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_bg-4.png")`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      className="relative text-center p-6 py-12 flex flex-col w-full rounded-[20px] lg:rounded-[50px]"
    >
      <div className="absolute inset-0 w-full bg-gradient-to-t from-white/60 via-transparent to-transparent rounded-[20px] lg:rounded-[50px]"></div>

      <div className="relative flex flex-col items-center justify-center w-full z-10">
        <PulseButton buttonText={buttonText} />

        <div className="w-full max-w-6xl mx-auto mt-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              bulletActiveClass: "swiper-pagination-bullet-active",
              bulletClass: "swiper-pagination-bullet",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            className="w-full"
          >
            {feedbackData?.map((feedback, index) => (
              <SwiperSlide key={index} className="pb-16">
                <FeedbackCard feedback={feedback} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination mt-8"></div>
        </div>
      </div>
    </div>
  );
};

const FeedbackCard = ({ feedback }: { feedback: TReview }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 200;

  const truncatedText =
    feedback.comment.length > MAX_LENGTH
      ? feedback.comment.slice(0, MAX_LENGTH) + "..."
      : feedback.comment;

  return (
    <div className="flex flex-col items-center">
      <blockquote className="text-[22px] leading-[38px] md:text-[34px] md:leading-[45px] lg:text-[48px] lg:leading-[64px] xl:text-[60px] xl:leading-[80px] text-black font-medium break-words text-center max-w-[90%] mx-auto">
        {expanded ? feedback.comment : truncatedText}
      </blockquote>

      {feedback.comment.length > MAX_LENGTH && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-lg mt-2 hover:underline"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}

      <div className="flex flex-col md:flex-row justify-center gap-x-4 items-center mt-8">
        <p className="text-lg font-semibold">{feedback.clientName}</p>
        <span className="bg-black size-1 rounded-full hidden md:block"></span>
        <p className="text-gray-500">{feedback.clientEmail}</p>
      </div>
    </div>
  );
};
