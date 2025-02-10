import Image from "next/image";
import React from "react";

interface IProject {
  title: string;
  department: string;
  projectIcon: string;
  video?: string;
  bgColor: string;
  image?: string;
}

const ProjectCard = ({ project }: { project: IProject }) => {
  const { title, department, projectIcon, video, bgColor, image } = project;
  return (
    <div className={`${bgColor} rounded-[20px]`}>
      <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden">
        {/* Background Image */}
        {video ? (
          <div className="absolute inset-0 scale-150">
            <iframe
              className="w-full h-full"
              src={video}
              title="Website Promo Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          <Image
            src={image || "https://i.ibb.co.com/xtBf3GQ8/image.png"}
            alt={title}
            fill
            className="object-cover rounded-[20px]"
          />
        )}

        {/* Full Image Overlay */}
        <div className="absolute inset-0 bg-black/5 rounded-[20px]"></div>

        {/* Centered Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[80px]">
          <Image
            src={projectIcon}
            alt="Project Icon"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-white py-[30px] px-[40px]">
        <h4 className="text-[26px] font-medium">{title}</h4>
        <h6>{department}</h6>
      </div>
    </div>
  );
};

export default ProjectCard;
