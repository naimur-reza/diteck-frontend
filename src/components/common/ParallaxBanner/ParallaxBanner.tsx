"use client";
import { ChevronRight } from "lucide-react";

export const ParallaxBanner = ({
  img,
  pageTitle,
  title,
  description,
}: {
  img: string;
  title: string;
  pageTitle?: string;
  description?: string;
}) => {
  return (
    <div
      className="relative bg-fixed h-[550px] bg-center bg-no-repeat bg-cover rounded-4xl w-full py-6 mx-2"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-4xl "></div>

      <div className="container mx-auto relative z-10 flex flex-col h-full w-full px-6 py-8 md:px-8">
        <nav className="border border-[#FFFFFF4D] w-fit px-5 py-2 rounded-[10px] text-[16px] transition duration-300 mb-[100px]">
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
              {pageTitle || ""}
            </li>
          </ol>
        </nav>

        <div>
          <h1 className="leading-tight text-white font-semibold text-[48px] md:text-[52px] lg:text-[100px]">
            {title || ""}
          </h1>
          <p className="max-w-[80%] lg:max-w-[50%] text-[16px] md:text-[18px] lg:text-[26px] text-white font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
