"use client";
import { SectionTitle } from "@/components/common";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ourDigitalServices } from "../../home/_constant/homeData";
export const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h4_bg7.png")`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      className="container my-[40px] mx-auto relative border pt-8 md:pt-10 lg:pt-14 rounded-card overflow-hidden"
    >
      <div className="relative z-10">
        <SectionTitle
          buttonText="Our services"
          title="Digital services to grow your business"
        />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-20 mt-10 pb-10">
          {/* Image Section */}
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[700px] rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={ourDigitalServices[activeIndex].image}
                alt={ourDigitalServices[activeIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>

          {/* Accordion Section */}
          <div className="relative space-y-8 md:space-y-10 lg:space-y-12">
            {ourDigitalServices.slice(0, 3).map((service, index) => (
              <div
                onMouseOver={() => setActiveIndex(index)}
                key={service.title}
                className={`cursor-pointer transition-all duration-500 p-4 md:pt-5 h-auto md:h-[150px] flex flex-col md:flex-row items-start md:items-center max-w-full md:max-w-[600px] overflow-hidden ${
                  activeIndex === index
                    ? "opacity-100 border-t border-gray-400/20"
                    : "opacity-50 md:opacity-30"
                }`}
              >
                <div className="flex items-start gap-x-4 md:gap-x-6 lg:gap-x-20">
                  <h4 className="text-[24px] text-primary font-semibold">{`0${
                    index + 1
                  }`}</h4>

                  <div className="w-full">
                    <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-base mt-2 md:mt-3 text-[#484848]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
