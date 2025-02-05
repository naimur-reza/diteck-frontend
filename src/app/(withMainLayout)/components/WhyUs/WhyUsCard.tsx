import React from "react";

const WhyUsCard = ({
  title,
  count,
  description,
  increment,
}: {
  title: string;
  count: string;
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
        <span className="text-[100px]">{count}</span>
        <span className="text-[80px]">{increment || "+"}</span>
      </p>
      <p className="text-[#484848] text-[20px]">{description}</p>
    </div>
  );
};

export default WhyUsCard;
