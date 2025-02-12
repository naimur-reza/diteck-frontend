"use client";
import React, { JSX } from "react";

interface Achievement {
  logo: JSX.Element;
  title: string;
  description: string;
  year: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-t border-black py-5 gap-5">
      <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10">
        <div>{achievement.logo}</div>
        <div className="text-center md:text-left">
          <h6 className="text-[20px] lg:text-[24px] font-medium">
            {achievement.title}
          </h6>
          <span className="text-light">{achievement.description}</span>
        </div>
      </div>
      <div>
        <span className="text-light">{achievement.year}</span>
      </div>
    </div>
  );
};

export default AchievementCard;
