import { LinkButtonWithIcon, SectionTitle } from "@/components/common";
import { TProject } from "@/types";
import React from "react";
import ProjectCard from "./ProjectCard";

const getSelectedWorks = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/previous-work`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return { data: [] };
  }
};

const SelectedWorks = async () => {
  const { data: projects } = (await getSelectedWorks()) as { data: TProject[] };

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
        {projects?.map((project, idx) => (
          <ProjectCard project={project} key={idx} idx={idx} />
        ))}
      </div>
      <LinkButtonWithIcon link="/" text="view all works" />
    </div>
  );
};

export default SelectedWorks;
