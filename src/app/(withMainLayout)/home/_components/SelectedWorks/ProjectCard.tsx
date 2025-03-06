import { TProject } from "@/types";
import { getProjectBgColor } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard = ({ project, idx }: { project: TProject; idx: number }) => {
  const { title, category, thumbnail, slug } = project;

  return (
    <div className={`${getProjectBgColor(idx)} rounded-[20px]`}>
      <Link href={`/project/${slug}`}>
        <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden">
          {/* Background Image */}
          {/* {video ? (
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
          ) : ( */}
          <Image
            src={thumbnail || "https://i.ibb.co.com/xtBf3GQ8/image.png"}
            alt={title}
            fill
            className="object-cover rounded-[20px]"
          />
          {/* )} */}

          {/* Full Image Overlay */}
          <div className="absolute inset-0 bg-black/5 rounded-[20px]"></div>

          {/* Centered Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[80px]">
            {/* <Image
              src={projectIcon}
              alt="Project Icon"
              fill
              className="object-contain"
            /> */}
          </div>
        </div>
      </Link>

      <div className="text-white py-[30px] px-[40px]">
        <h4 className="text-[26px] font-medium">
          <Link href={`/project/${slug}`}>{title}</Link>
        </h4>
        <h6>
          <Link href={`#`}>{category}</Link>
        </h6>
      </div>
    </div>
  );
};

export default ProjectCard;
