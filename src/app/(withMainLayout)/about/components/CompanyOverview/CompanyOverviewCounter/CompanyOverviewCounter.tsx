import { companyOverview } from "@/app/(withMainLayout)/home/_constant/companyOverview";
import React from "react";
import SingleCounter from "./SingleCounter";

const CompanyOverviewCounter = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 py-10">
      {companyOverview.map((company, idx) => (
        <SingleCounter key={idx} company={company} />
      ))}
    </div>
  );
};

export default CompanyOverviewCounter;
