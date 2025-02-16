import { JSX } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { GiCrystalGrowth } from "react-icons/gi";
import { SlBadge } from "react-icons/sl";

interface feature {
  id: number;
  title: string;
  description: string;
  logo: JSX.Element;
}

export const highlightFeatures: feature[] = [
  {
    id: 1,
    title: "Focus on driving results",
    description:
      "Our quick time and proactive approach assist our clients to rehearse the future and outperform the competition.",

    logo: <TbReportAnalytics className="text-[48px] text-primary" />,
  },
  {
    id: 2,
    title: "Help your business grow",
    description:
      "Our dynamic resourcing calibration can replicate any solution for a much larger playing ground.",

    logo: <GiCrystalGrowth className="text-[48px] text-primary" />,
  },
  {
    id: 3,
    title: "Best quality customer service",
    description:
      "Cognitive capabilities and data analytics bring efficiency and competitive edge.",
    logo: <SlBadge className="text-[48px] text-primary" />,
  },
];
