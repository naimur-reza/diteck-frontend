import React from "react";

interface Achievement {
  logo: string;
  title: string;
  description: string;
  year: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return <div>{achievement.title}</div>;
};

export default AchievementCard;
