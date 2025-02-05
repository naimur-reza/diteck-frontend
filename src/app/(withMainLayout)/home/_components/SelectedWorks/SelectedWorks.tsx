import { SectionTitle } from "@/components/common";
import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "UI/UX Design Platform",
    department: "Advanced Analystics",
    projectIcon: "https://i.ibb.co.com/JNKSBDw/project-logo-2.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#12343E]",
  },
  {
    title: "Social Media Campaigns",
    department: "Design",
    projectIcon: "https://i.ibb.co.com/4wq0DmFm/project-logo-1.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#3E122F]",
  },
  {
    title: "Content Marketing Suite",
    department: "Development",
    projectIcon: "https://i.ibb.co.com/4nDkBqtR/project-logo-3.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#526648]",
  },
  {
    title: "SEO & Marketing Tools",
    department: "Advanced Analystics",
    projectIcon: "https://i.ibb.co.com/675R8KrG/project-logo-4.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#423B2F]",
  },
  {
    title: "Creative Branding Agency",
    department: "Marketing Strategy",
    projectIcon: "https://i.ibb.co.com/bgRyccDt/project-logo-6.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#2D2736]",
  },
  {
    title: "Video Production Hub",
    department: "Technology",
    projectIcon: "https://i.ibb.co.com/3yD7JRpS/project-logo-5.png",
    video: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#4A0E0F]",
  },
];

const SelectedWorks = () => {
  return (
    <div className="container mx-auto bg-gradient-to-b from-purple-100 via-green-50 to-white rounded-[40px] p-10">
      <div>
        <SectionTitle
          buttonText="Selected Works"
          title="Our finished projects"
          rightText="Read how we’ve helped some of the biggest brands transform their business."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {projects.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default SelectedWorks;
