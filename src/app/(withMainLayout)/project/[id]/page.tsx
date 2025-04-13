import { TProject } from "@/types";
import getAllProjects from "@/utils/fetchData/getAllProjects";
import getSingleProject from "@/utils/fetchData/getSingleProject";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProjectNavigator from "./_components/ProjectNavigator";
import StackCard from "./_components/StackCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectDetailPage = async ({ params }: { params: any }) => {
  const data = await getSingleProject(params?.id);
  const { data: project }: { data: TProject } = data;

  const {
    _id,
    title,
    description,
    author,
    category,
    thumbnail,
    images,
    createdAt,

    websiteFeatures,
    frontendTech,
    backendTech,
    databases,

    securityFeatures,

    timeTakenToDevelop,
  } = project || {};

  const meta = [
    {
      title: "Date",
      desc: new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { title: "Client", desc: author?.name || "Client name" },
    { title: "Category", desc: category },
    { title: "Location", desc: "Location" },
  ];

  const { data: projects }: { data: TProject[] } = await getAllProjects();

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-2xl font-semibold text-red-500">
          Failed to load project details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div
        className="pt-5 md:pt-10 lg:pt-40 pb-20 bg-no-repeat bg-top bg-contain"
        style={{
          backgroundImage:
            "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
        }}
      >
        {/* Department */}
        <div className="flex justify-center items-center gap-5">
          <Link
            href={"#"}
            className="border border-[#636EDF4D] w-fit lg:min-w-fit rounded-[10px] text-black text-[14px] md:text-[18px] px-4 py-1.5  flex items-center gap-2 hover:bg-gray-200 transition"
          >
            <span className="w-2 h-2 rounded-[1px] bg-[#636EDF] animate-pulse"></span>
            {category}
          </Link>
        </div>

        {/* Main Content */}
        <article>
          {/* Title */}
          <div>
            <h2 className="text-[30px] md:text-[52px] lg:text-[80px] lg:leading-[80px] font-semibold text-center lg:max-w-[60%] mx-auto mt-5 lg:mt-10">
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:max-w-[70%] mx-auto mt-10 mb-20">
            {meta?.map(({ title, desc }, idx) => (
              <div className="text-center" key={idx}>
                <span className="text-light">{title}</span>
                <p className="font-medium text-[18px]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Featured image */}
          <div className="relative w-full min-h-[150px] md:min-h-[300px] lg:min-h-[600px] rounded-[40px] mt-10">
            {/* Featured Image */}
            {thumbnail ? (
              <div className="relative w-full min-h-[150px] md:min-h-[300px] lg:min-h-[600px] rounded-[40px] mt-10">
                <Image
                  src={thumbnail}
                  fill
                  alt="Project Thumbnail"
                  className="rounded-[40px] object-cover"
                />
              </div>
            ) : (
              <p className="text-center text-red-500">No thumbnail available</p>
            )}
          </div>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-5">
            {images && images.length > 0 ? (
              images?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full min-h-[250px] lg:min-h-[450px] rounded-[40px]"
                >
                  <Image
                    src={img}
                    fill
                    alt=""
                    className="rounded-[40px] object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No additional images available
              </p>
            )}
          </div>

          <div className="lg:max-w-[80%] mx-auto mt-10 md:text-[20px]">
            <div className="grid md:grid-cols-2 gap-10">
              <p>
                <span className="block font-semibold">Duration: </span>
                <span className="block text-[20px] text-light pb-5">
                  {timeTakenToDevelop}
                </span>
              </p>
            </div>

            <p className="text-accent font-medium text-[24px] leading-[24px] py-10">
              {description}
            </p>

            {/* Website Features */}
            <StackCard
              title="Website Features"
              items={websiteFeatures}
              description="This section highlights the core features integrated into the website, ensuring a seamless user experience, responsive design, and enhanced functionality tailored to the project's needs."
            />

            {/* Frontend Tech */}
            <StackCard
              title="Frontend Tech"
              items={frontendTech}
              description="The frontend of this project is built with cutting-edge technologies to ensure a fast, interactive, and visually appealing user experience across all devices."
            />

            {/* Backend Tech */}
            <StackCard
              title="Backend Tech"
              items={backendTech}
              description="The backend architecture is designed to be robust, scalable, and secure, handling data processing, business logic, and API interactions efficiently."
            />

            {/* Databases */}
            <StackCard
              title="Databases"
              items={databases}
              description="A well-structured database system is implemented to store, retrieve, and manage data efficiently, ensuring high performance and data integrity."
            />

            {/* Security Features */}
            <StackCard
              title="Security Features"
              items={securityFeatures}
              description="Security best practices, such as data encryption, authentication mechanisms, and secure API handling, are implemented to safeguard user data and prevent vulnerabilities."
            />
          </div>
        </article>

        <ProjectNavigator currentPostId={_id} projects={projects || []} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
