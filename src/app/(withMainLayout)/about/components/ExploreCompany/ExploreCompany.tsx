import { SectionTitle } from "@/components/common";
import React from "react";
import CompanyCard from "./CompanyCard";
import { companies } from "@/app/(withMainLayout)/home/_constant/companies";

const ExploreCompany = () => {
  return (
    <section className="bg-[#121646] py-[40px] md:py-[80px] lg:py-[150px] rounded-[40px] m-2">
      <div className="container mx-auto text-white">
        <SectionTitle
          buttonText="Explore company"
          title="Business partner you can trust"
          color="text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies?.map((company, idx) => (
            <CompanyCard key={idx} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCompany;
