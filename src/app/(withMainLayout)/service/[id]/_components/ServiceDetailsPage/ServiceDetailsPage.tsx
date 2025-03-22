import { TService } from "@/types";
import Image from "next/image";
import React from "react";
import { PopularQuestion } from "../Popularquestion";
import { ProblemWeSolve } from "../ProblemWeSolve";
import { ServiceFeatures } from "../ServiceFeatures";
import ServicePricingCard from "../ServicePricingCard";
import WhatWeUse from "../WhatWeUse";

interface ServiceDetailsProps {
  service: TService;
}

const ServiceDetailsPage = ({ service }: ServiceDetailsProps) => {
  return (
    <div className="space-y-8 md:space-y-10">
      <h3 className=" font-medium  text-[28px] leading-[30px]  md:text-[32px] md:leading-[40px]">
        {service?.title}
      </h3>
      <Image
        src={service?.photo}
        width={1000}
        height={1000}
        alt="service"
        className="rounded-3xl h-auto"
      />
      <ServicePricingCard service={service} />
      <ServiceFeatures service={service} />
      <ProblemWeSolve service={service} />
      <PopularQuestion service={service} />
      <WhatWeUse service={service} />
    </div>
  );
};

export default ServiceDetailsPage;
