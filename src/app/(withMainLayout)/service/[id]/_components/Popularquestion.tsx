"use client";
import React, { useState } from "react";
import { ServiceTitleAndDescription } from "./ServiceTitleAndDescription";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { faqData } from "../constant";

export const PopularQuestion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <ServiceTitleAndDescription
        title="Popular questions"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
      />
      <div className="grid grid-cols-1 md:grid-cols-2   items-start md:gap-x-7 lg:gap-x-14 gap-y-5 md:gap-y-0 mt-12">
        {/* image */}
        <div className=" h-full md:h-[600px] lg:h-full ">
          <Image
            alt=""
            src={
              "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/service-detail.jpg"
            }
            width={700}
            height={700}
            className="object-cover rounded-2xl h-full"
          />
        </div>
        {/* question accordion */}
        <div className="space-y-4  ">
          {faqData.map((service, index) => (
            <div
              key={service.question}
              className="border border-[#d5d8dc] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="w-full hover:cursor-pointer flex items-center justify-between p-4 text-left   transition-colors"
              >
                <h3 className="text-xl font-normal">{service.question}</h3>
                {activeIndex === index ? (
                  <X className="w-6 h-6 " />
                ) : (
                  <Plus className="w-6 h-6 " />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden "
                  >
                    <div className="p-4 pt-0  ">
                      <p className="mb-4 text-base text-[#484848] font-normal">
                        {service.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
