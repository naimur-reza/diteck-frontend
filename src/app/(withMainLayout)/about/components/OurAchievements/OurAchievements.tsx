"use client";
import { achievements } from "@/app/(withMainLayout)/home/_constant/achievements";
import { SectionTitle } from "@/components/common";
import React from "react";
import AchievementCard from "./AchievementCard";

const OurAchievements = () => {
  return (
    <div className="container mx-auto">
      <SectionTitle
        buttonText="Our Achievements"
        title={`Awards & recognition`}
      />
      <div className="w-full md:w-[calc(100%-200px)] lg:w-[calc(100%-400px)] ml-auto">
        {achievements?.map((achievement, idx) => (
          <AchievementCard key={idx} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default OurAchievements;
