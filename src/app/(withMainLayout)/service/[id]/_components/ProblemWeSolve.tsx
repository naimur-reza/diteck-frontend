import { TService } from "@/types";
import { services } from "../constant";
import { ServiceTitleAndDescription } from "./ServiceTitleAndDescription";

export const ProblemWeSolve = ({ service }: { service: TService }) => {
  const { } = service || {};

  return (
    <div className="border-b border-gray-300 pb-[50px] ">
      <ServiceTitleAndDescription
        title="Problems we solve"
        description="From content creation and partnership brokering to dynamic content optimisation and sponsorship, we do a lot more in the world of content than you would imagine from a media agency"
      />
      <div className="mt-12 space-y-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start justify-between border-t gap-y-2 md:gap-y-0  border-gray-300 pt-8"
          >
            <h3 className=" md:max-w-[60%] flex items-center gap-x-5 text-lg xl:text-2xl font-medium">
              <span className="w-[8px] h-[8px] bg-primary rounded-[2px]"></span>
              {service.title}
            </h3>
            <ul className=" md:max-w-[40%] w-full  space-y-2">
              {service.details.map((detail, i) => (
                <li key={i} className="flex items-center  gap-3">
                  <span className="w-1.5 h-1.5 bg-[#DFDEE5] rounded-[1px]"></span>
                  <p className=" text-base font-normal text-[#484848]">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
