import Image from "next/image";
import React from "react";
import WhyUsCard from "./WhyUsCard";
import WULeftSideBanner from "./WULeftSideBanner";
import { SectionTitle } from "@/components/common";

const WhyUs = () => {
  return (
    <section className="container mx-auto px-5">
      <SectionTitle
        buttonText="Why choose us"
        title="Results that we successfully deliver"
      />
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="flex flex-col gap-5">
          <div className="relative w-full h-[500px] rounded-[20px]">
            <Image
              src="https://i.ibb.co.com/gFJFQB41/h1-img-2.jpg"
              alt=""
              fill
              className="object-cover rounded-[20px]"
            />
          </div>
          <WhyUsCard
            title="satisfied customers"
            count="98"
            increment="%"
            description="A 98% satisfaction rate across all our consulting services."
          />
        </div>
        <div className="flex flex-col gap-5">
          <WhyUsCard
            title="projects completed"
            count="475"
            description="Over 400 successful projects delivered to our clients worldwide."
          />
          <WhyUsCard
            title="hours saved"
            count="843K"
            description="Our efficiency strategies have saved clients over 800,000 hours collectively."
          />
        </div>
        <div>
          <WULeftSideBanner />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
