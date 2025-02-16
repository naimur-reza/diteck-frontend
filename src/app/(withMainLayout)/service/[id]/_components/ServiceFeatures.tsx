import { Check } from "lucide-react";
import { ServiceTitleAndDescription } from "./ServiceTitleAndDescription";
import { features } from "../constant";

export const ServiceFeatures = () => {
  return (
    <div className="border-b border-gray-300 pb-[60px] lg:pb-[100px]">
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
