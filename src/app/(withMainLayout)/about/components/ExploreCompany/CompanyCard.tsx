import { LinkButtonWithIcon } from "@/components/common";
import React from "react";

interface ICompany {
  id: string;
  name: string;
  description: string;
  bg: string;
  path: string;
  btnText: string;
}

const CompanyCard = ({ company }: { company: ICompany }) => {
  const { id, name, description, bg, btnText, path } = company;
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-no-repeat bg-center p-8 md:p-12 rounded-[20px] text-white border border-[#37355E]"
    >
      <span className="mb-[50px] md:mb-[100px] lg:mb-[170px] text-primary text-[24px] block">
        {id}.
      </span>
      <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-medium">
        {name}
      </h3>
      <p className="text-base md:text-[20px] mt-4 text-light">{description}</p>
      <div className="mt-[60px]">
        <LinkButtonWithIcon
          link={path}
          invertedBorder={false}
          text={btnText}
          position="start"
          bgColor="bg-transparent"
          textColor="text-white"
          isBorder={false}
        />
      </div>
    </div>
  );
};

export default CompanyCard;
