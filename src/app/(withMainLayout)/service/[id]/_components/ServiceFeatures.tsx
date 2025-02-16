import { Check, CheckCircle } from "lucide-react";
import { ServiceTitleAndDescription } from "./ServiceTitleAndDescription";

const features = [
  {
    title: "Quality & Reliable",
    description: "We provide all types of business & financial consultations.",
  },
  {
    title: "Licensed & Insured",
    description:
      "Our dynamic resourcing calibration can replicate any solution for a much larger playing ground.",
  },
  {
    title: "Skilled Staff",
    description:
      "Cognitive capabilities and data analytics bring efficiency and competitive edge.",
  },
  {
    title: "Warranty & Maintenance",
    description:
      "Our quick time and proactive approach assist our clients to rehearse the future.",
  },
];

export const ServiceFeatures = () => {
  return (
    <div>
      <ServiceTitleAndDescription
        title="Service features"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-6 mt-[40px]">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start lg:gap-x-8 gap-x-4">
            <div className="bg-[#E3E3F4] lg:p-[24px] p-[20px] rounded-[20px]">
              <Check size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="xl:text-[32px] text-2xl font-medium">
                {feature.title}
              </h3>
              <p className="text-[#484848] text-base font-normal">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
