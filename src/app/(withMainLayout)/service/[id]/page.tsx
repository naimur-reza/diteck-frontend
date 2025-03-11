import Image from "next/image";
import React from "react";
import {
  PopularQuestion,
  ProblemWeSolve,
  ServiceFeatures,
} from "./_components";
import getSingleService from "@/utils/fetchData/getSingleService";
import { TService } from "@/types";
import WhatWeUse from "./_components/WhatWeUse";
import ServicePricingCard from "./_components/ServicePricingCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceDetails = async ({ params }: { params: any }) => {
  const { data: service }: {
    data: TService
  } = await getSingleService(params?.id);

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

export default ServiceDetails;
