"use client";

import { ParallaxBanner, SectionTitle } from "@/components/common";
import CareerCard from "./_components/CareerCard";
import { jobs } from "./_constant/careerData";

const Career = () => {
  return (
    <div className="container bg-gradient-to-t from-transparent via-rose-100 to-transparent">
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/career_bc.jpg"
        pageTitle="Career"
        title="Career"
        description="By joining our team, you’ll have the opportunity to work on cutting projects, leverage the latest technologies, and make a real impact."
      />
      <SectionTitle title="Current openings" buttonText="Apply now" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 py-10">
        {jobs.map((job, index) => (
          <CareerCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Career;
