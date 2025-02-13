"use client";

import { SectionTitle } from "@/components/common";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { ourDigitalServices } from "../../_constant/homeData";

const OurServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container relative border pt-8 md:pt-10 lg:pt-14 rounded-card overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F42] rounded-card" />
      <div className="absolute w-[600px] h-[350px] -top-1/2 left-1/2 -translate-x-1/2 blur-[100px] bg-green-400/30 rounded-card" />

      <div className="relative z-10">
        <SectionTitle
          color="text-white"
          buttonText="Our services"
          title="Digital services to grow your business"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 lg:mt-10 pb-10">
          {/* Left: Image Section */}
          <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
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

          {/* Right: Accordion Section */}
          <div className="space-y-4">
            {ourDigitalServices.map((service, index) => (
              <div
                key={service.title}
                className="border border-white/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(index)}
                  className="w-full hover:cursor-pointer flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {service.title}
                  </h3>
                  {activeIndex === index ? (
                    <X className="w-6 h-6 text-white/70" />
                  ) : (
                    <Plus className="w-6 h-6 text-white/70" />
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
                      <div className="p-4 pt-0 text-white/70 ">
                        <p className="mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.services.map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1 rounded-full bg-white/10 text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
