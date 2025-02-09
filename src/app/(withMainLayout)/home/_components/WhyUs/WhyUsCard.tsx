"use client";
import React from "react";
import CountUp from "react-countup";

const WhyUsCard = ({
  title,
  count,
  suffix,
  description,
  increment,
}: {
  title: string;
  count: number;
  suffix?: string;
  description: string;
  increment?: string;
}) => {
  return (
    <div className="bg-white rounded-[20px] shadow px-[60px] py-[50px]">
      <div className="flex items-center gap-5">
        <span className="bg-primary w-[10px] h-[10px] rounded" />
        <h3 className="text-[24px] font-medium">{title}</h3>
      </div>
      <p className="flex mt-[125px] font-medium">
        <span className="text-[56px] lg:text-[100px]">
          <CountUp end={Number(count)} />
          {suffix && suffix}
        </span>
        <span className="text-[48px] lg:text-[80px]">{increment || "+"}</span>
      </p>
      <p className="text-[#484848] text-[20px]">{description}</p>
    </div>
  );
};

export default WhyUsCard;
