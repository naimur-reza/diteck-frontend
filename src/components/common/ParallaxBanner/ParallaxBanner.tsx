"use client";
import { ChevronRight } from "lucide-react";

export const ParallaxBanner = ({
  img,
  title,
}: {
  img: string;
  title: string;
}) => {
  return (
    <div
      className="relative bg-fixed h-[550px] bg-center bg-no-repeat bg-cover rounded-4xl w-full py-12"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-4xl "></div>

      <div className="relative z-10 flex flex-col h-full w-full px-6 py-8 md:px-8">
        <nav className="border border-[#FFFFFF4D] w-fit px-5 py-2 rounded-[10px] text-[16px] transition duration-300">
          <ol className="flex items-center space-x-2 text-sm text-[#FFFFFF99]">
            {/* Home Link */}
            <li className="hover:text-white transition duration-300">Home</li>

            {/* Chevron in Circle */}
            <li>
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#FFFFFF4D]">
                <ChevronRight size={11} className="text-black" />
              </div>
            </li>

            {/* Our Services Link */}
            <li className="hover:text-white transition duration-300">
              Our Services
            </li>
          </ol>
        </nav>

        <div className="flex-1 flex items-center ">
          <h1 className="text-[4rem] font-light leading-tight text-white md:text-[5rem]">
            {title ? title : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};
