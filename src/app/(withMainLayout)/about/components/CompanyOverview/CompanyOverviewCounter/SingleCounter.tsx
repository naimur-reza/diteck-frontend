"use client";

import React from "react";
import CountUp from "react-countup";

type TCompany = {
  title: string;
  count: number;
};

const SingleCounter = ({ company }: { company: TCompany }) => {
  return (
    <div className="border-l p-5 flex flex-col justify-between last:border-r">
      <div
        className={`min-w-fit rounded-[10px]  font-medium text-base md:text-lg px-4 py-1.5 flex items-baseline justify-center gap-4 lg:mb-28`}
      >
        <span className="min-w-2 h-2 rounded-[2px]  bg-primary"></span>
        {company.title}
      </div>

      <p>
        <span className="text-[64px] lg:text-[100px] font-medium">
          <CountUp end={company.count} />
        </span>
        <sup className="text-[48px] lg:text-[75px]">+</sup>
      </p>
    </div>
  );
};

export default SingleCounter;
