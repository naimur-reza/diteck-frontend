"use client";

import React from "react";
import CountUp from "react-countup";

type TCompany = {
  title: string;
  count: number;
};

const SingleCounter = ({ company }: { company: TCompany }) => {
  return (
    <div className="border-r p-5 flex flex-col justify-between">
      <div
        className={`min-w-fit rounded-[10px]  font-medium text-sm md:text-lg px-4 py-1.5 flex items-baseline justify-center gap-4 mb-28`}
      >
        <span className="min-w-2 h-2 rounded-[2px]  bg-primary"></span>
        {company.title}
      </div>

      <p className="flex items-start">
        <span className="text-[100px] font-medium">
          <CountUp end={company.count} />
        </span>
        <span className="text-[60px]">+</span>
      </p>
    </div>
  );
};

export default SingleCounter;
