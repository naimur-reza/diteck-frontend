import { SectionTitle } from "@/components/common";
import { TProject } from "@/types";
import getAllProjects from "@/utils/fetchData/getAllProjects";
import ProjectCard from "../home/_components/SelectedWorks/ProjectCard";

const Project = async () => {
  const { data: projects }: { data: TProject[] } = await getAllProjects();
  return <div
    style={{
      backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h1_bg-3.png")`,
      backgroundSize: "cover",
      backgroundPosition: "",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }}
    className={`rounded-card relative pt-5 md:pt-10  lg:pt-14 mt-10`}
  >
    <div className="absolute inset-0   w-full bg-gradient-to-b from-white/60 via-transparent to-transparent  rounded-[40px]"></div>
    <div className="relative z-10 container mx-auto">
      <SectionTitle
        buttonText="Selected Works"
        title="Our finished projects"
        rightText="Read how we’ve helped some of the biggest brands transform their business."
      />
    </div>

    <div className="container mx-auto grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 pb-20 relative z-10">
      {projects?.map((project, idx) => (
        <ProjectCard project={project} key={idx} idx={idx} />
      ))}
    </div>
  </div>;
};

export default Project;
