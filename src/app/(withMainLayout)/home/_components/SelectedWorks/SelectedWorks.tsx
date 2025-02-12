import { LinkButtonWithIcon, SectionTitle } from "@/components/common";
import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "UI/UX Design Platform",
    department: "Advanced Analystics",
    projectIcon: "https://i.ibb.co.com/JNKSBDw/project-logo-2.png",
    video:
      "https://www.youtube.com/embed/g7xkVEWrX8E?autoplay=1&mute=1&loop=1&playlist=g7xkVEWrX8E",
    bgColor: "bg-[#12343E]",
  },
  {
    title: "Social Media Campaigns",
    department: "Design",
    projectIcon: "https://i.ibb.co.com/4wq0DmFm/project-logo-1.png",
    video:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ",
    bgColor: "bg-[#3E122F]",
  },
  {
    title: "Content Marketing Suite",
    department: "Development",
    projectIcon: "https://i.ibb.co.com/4nDkBqtR/project-logo-3.png",
    video:
      "https://www.youtube.com/embed/8G-QlieU8IY?autoplay=1&mute=1&loop=1&playlist=8G-QlieU8IY",
    bgColor: "bg-[#526648]",
  },
  {
    title: "SEO & Marketing Tools",
    department: "Advanced Analystics",
    projectIcon: "https://i.ibb.co.com/675R8KrG/project-logo-4.png",
    image: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#423B2F]",
  },
  {
    title: "Creative Branding Agency",
    department: "Marketing Strategy",
    projectIcon: "https://i.ibb.co.com/bgRyccDt/project-logo-6.png",
    image: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#2D2736]",
  },
  {
    title: "Video Production Hub",
    department: "Technology",
    projectIcon: "https://i.ibb.co.com/3yD7JRpS/project-logo-5.png",
    image: "https://i.ibb.co.com/xtBf3GQ8/image.png",
    bgColor: "bg-[#4A0E0F]",
  },
];

const SelectedWorks = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_bg-3.png")`,
        backgroundSize: "cover",
        backgroundPosition: "",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      className={`container  rounded-card relative pt-5 md:pt-10  lg:pt-14`}
    >
      <div className="absolute inset-0   w-full bg-gradient-to-b from-white/60 via-transparent to-transparent  rounded-[40px]"></div>
      <div className="relative z-10">
        <SectionTitle
          buttonText="Selected Works"
          title="Our finished projects"
          rightText="Read how we’ve helped some of the biggest brands transform their business."
        />
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 pb-20 relative z-10">
        {projects.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </div>
      <LinkButtonWithIcon link="/" text="view all works" />
    </div>
  );
};

export default SelectedWorks;
