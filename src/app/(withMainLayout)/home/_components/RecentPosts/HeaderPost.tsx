import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface IPost {
  category: string;
  date: string;
  author: string;
  title: string;
  shortDesc: string;
  img: string;
}

const HeaderPost = ({ post }: { post: IPost }) => {
  const { category, date, author, title, shortDesc, img } = post;
  return (
    <div className="relative w-full h-auto border-b border-b-black pb-10">
      {/* Image Container */}
      <div className="relative w-full h-[450px] rounded-[20px] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="rounded-[20px] object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Bottom Info Section */}
        <div className="absolute z-10 bottom-0 left-0 bg-white flex gap-3 text-sm font-semibold uppercase px-5 py-3 rounded-tr-[20px]">
          <Link
            href="#"
            className="text-primary hover:text-light transition-colors duration-300"
          >
            {category}
          </Link>
          <p className="text-gray-500">{date}</p>
          <p className="text-gray-500">{author}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Title & Description */}
        <div className="mt-5">
          <h3>
            <Link
              href="#"
              className="text-[42px] font-medium hover:text-primary transition-colors duration-300 mb-2 block"
            >
              {title}
            </Link>
          </h3>
          <p className="text-gray-600">{shortDesc.slice(0, 110)}...</p>
        </div>

        {/* Hover Arrow Button */}
        <div className="flex items-center ml-auto p-4 bg-primary text-white rounded-[15px]  transition-all duration-600">
          <Link href="#">
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderPost;
