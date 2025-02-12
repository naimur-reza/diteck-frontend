import { JSX } from "react";
import {
  CyberCodeIcon,
  CyberTechIcon,
  SmartRonicIcon,
  TechGroupIcon,
} from "../../about/components/OurAchievements/Icons/Icons";

interface Achievement {
  id: number;
  title: string;
  description: string;
  year: number;
  logo: JSX.Element;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "CyberCode Agency Awards",
    description: "Finalist of UK design agency awards",
    year: 2020,
    logo: (
      <CyberCodeIcon className="cyber-icon md:min-w-[200px] lg:min-w-[250px] lg:min-h-[120px]" />
    ),
  },
  {
    id: 2,
    title: "CyperTech Mobile App Development",
    description: "Honourable mention award 2022",
    year: 2021,
    logo: (
      <CyberTechIcon className="cyber-icon md:min-w-[200px] lg:min-w-[250px] lg:min-h-[120px]" />
    ), // Replace with actual logo path
  },
  {
    id: 3,
    title: "Techgroup Awards",
    description: "UX UI Design Leader Companies",
    year: 2022,
    logo: (
      <TechGroupIcon className="cyber-icon md:min-w-[200px] lg:min-w-[250px] lg:min-h-[120px]" />
    ), // Replace with actual logo path
  },
  {
    id: 4,
    title: "Smartronic Featured",
    description: "Interface Design Europe Award Winner",
    year: 2023,
    logo: (
      <SmartRonicIcon className="cyber-icon md:min-w-[200px] lg:min-w-[250px] lg:min-h-[120px]" />
    ), // Replace with actual logo path
  },
];
