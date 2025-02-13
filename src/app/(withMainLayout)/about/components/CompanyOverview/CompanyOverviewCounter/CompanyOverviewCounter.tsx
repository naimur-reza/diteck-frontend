import { companyOverview } from "@/app/(withMainLayout)/home/_constant/companyOverview";
import React from "react";
import SingleCounter from "./SingleCounter";

const CompanyOverviewCounter = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {companyOverview.map((company, idx) => (
        <SingleCounter key={idx} company={company} />
      ))}
    </div>
  );
};

export default CompanyOverviewCounter;
