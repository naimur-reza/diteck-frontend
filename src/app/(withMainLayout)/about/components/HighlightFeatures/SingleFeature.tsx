import React, { JSX } from "react";

interface IFeature {
  id: number;
  title: string;
  description: string;
  logo: JSX.Element;
}

const SingleFeature = ({ feature }: { feature: IFeature }) => {
  return (
    <div className="flex items-center space-x-7 my-4 border-t p-8">
      <div className="bg-[#E3E3F4] rounded-[20px] p-4">{feature.logo}</div>
      <div>
        <h3 className="text-[24px] text-accent font-medium pb-2">
          {feature.title}
        </h3>
        <p className="text-light">{feature.description}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
