import Image from "next/image";
import React from "react";
import {
  PopularQuestion,
  ProblemWeSolve,
  ServiceFeatures,
} from "./_components";
import getSingleService from "@/utils/fetchData/getSingleService";
import { TService } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceDetails = async ({ params }: { params: any }) => {
  const { data: service }: { data: TService } = await getSingleService(params?.id);

  return (
    <div className="space-y-8 md:space-y-10">
      <h3 className=" font-medium  text-[28px] leading-[30px]  md:text-[32px] md:leading-[40px]">
        A digital marketing agency can help businesses of all sizes and
        industries to improve their online visibility, generate leads, and
        increase sales. Strengthen your team in strategy, marketing & operations
      </h3>
      <Image
        src={
          "https://demo2.wpopal.com/diteck/wp-content/uploads/elementor/thumbs/service_5-qxbfyq7z771y3ld64cf53ce44rv6mpiil87umnhr38.jpg"
        }
        width={1000}
        height={1000}
        alt="service"
        className="rounded-3xl h-auto"
      ></Image>

      <ServiceFeatures />
      <ProblemWeSolve />
      <PopularQuestion />
    </div>
  );
};

export default ServiceDetails;
