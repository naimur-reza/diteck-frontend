"use client";

import { SectionTitle } from "@/components/common";
import { TService } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface OurServicesClientProps {
  initialData: TService[];
}

const OurServices = ({ initialData }: OurServicesClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Extract the services array from the API response
  const services = initialData;

  // Helper function to combine all technology/feature arrays into a single array for tags
  const getServiceTags = (service: TService) => {
    const tags = [
      ...(service.frontendTech || []),
      ...(service.backendTech || []),
      ...(service.cssFramework || []),
      ...(service.database || []),
      ...(service.componentLibrary || []),
      ...(service.animationLibrary || []),
      ...(service.testing || []),
      ...(service.fileStorage || []),
      ...(service.paymentGateway || []),
      ...(service.features || []),
    ];

    // Return unique tags (remove duplicates)
    return [...new Set(tags)];
  };

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

        {services.length === 0 ? (
          <div className="text-center text-white/70 py-10">
            <p>No services available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 lg:mt-10 pb-10">
            {/* Left: Image Section */}
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                {services[activeIndex] && (
                  <motion.img
                    key={activeIndex}
                    src={services[activeIndex].photo}
                    alt={services[activeIndex].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Right: Accordion Section */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={service._id || index}
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
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-white/70">
                          <p className="mb-4">{service.description}</p>

                          {/* Additional service details */}
                          {service.turnAroundTime && (
                            <p className="mb-2">
                              <span className="font-medium">
                                Turnaround Time:
                              </span>{" "}
                              {service.turnAroundTime}
                            </p>
                          )}

                          {service.price && (
                            <p className="mb-4">
                              <span className="font-medium">Starting at:</span>{" "}
                              {service.price.currency}{" "}
                              {service.price.basePrice.toLocaleString()}
                              {service.price.customPricingAvailable &&
                                " (Custom pricing available)"}
                            </p>
                          )}

                          {/* Service tags */}
                          <div className="flex flex-wrap gap-2">
                            {getServiceTags(service).map((item, i) => (
                              <span
                                key={i}
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
        )}
      </div>
    </div>
  );
};

export default OurServices;
