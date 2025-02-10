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
      <div
        className="relative post-img bg-cover  bg-no-repeat h-[450px] w-full rounded-[40px]"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="absolute z-10 -bottom-4 left-0 bg-[#F2EDF3] flex gap-3 text-xs font-semibold uppercase pr-5 pt-5 pb-3 rounded-tr-[20px]">
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
        <div>
          <Link
            href="#"
            className="relative flex items-center ml-auto w-[50px] h-[50px] bg-primary text-white rounded-[15px] transition-all duration-600 group overflow-hidden"
          >
            <FaArrowRight className="absolute left-1/2 top-1/2 -translate-1/2 group-hover:left-[100px] transition-all duration-300" />
            <FaArrowRight className="absolute -left-1/2 top-1/2 -translate-1/2 group-hover:left-1/2 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderPost;
