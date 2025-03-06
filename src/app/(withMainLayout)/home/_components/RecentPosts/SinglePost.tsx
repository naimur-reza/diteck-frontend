import { TBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const SinglePost = ({ post }: { post: TBlog }) => {
  const { _id, createdAt, author, title, thumbnail } = post;
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 border-t first:border-t-0 last:border-b border-y-black py-10 bg-[#F2F1F6] relative group transition-all duration-600 md:-mb-[80px] md:hover:mb-[0px]">
      <div className="relative w-full md:max-w-[220px] h-[220px] rounded-[20px]  transition-all duration-600">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="rounded-[20px] object-cover"
        />
      </div>
      <div>
        <div className="flex gap-2 text-[12px] font-semibold uppercase mb-4">
          <p className="text-primary hover:text-light transition-colors duration-300">
            {/* {category} */}
          </p>
          <p className="text-light">
            {createdAt && new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="text-light">{author?.email}</p>
        </div>
        <h3 className="max-w-[90%]">
          <Link
            href={`/blog/${_id}`}
            className="text-[20px] lg:text-[28px] font-semibold hover:text-primary transition-colors duration-300"
          >
            {title}
          </Link>
        </h3>
      </div>

      <div className="absolute right-0 top-[50%] transform -translate-y-[50%] flex items-center ml-auto text-white rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Link
          href={`/blog/${_id}`}
          className="relative flex items-center justify-center w-[50px] h-[50px] bg-primary text-white rounded-[15px] transition-all duration-600 overflow-hidden group/icon"
        >
          {/* First Icon (Moves Out) */}
          <FaArrowRight className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/icon:left-[100px] transition-all duration-300" />

          {/* Second Icon (Moves In) */}
          <FaArrowRight className="absolute -left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/icon:left-1/2 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default SinglePost;
