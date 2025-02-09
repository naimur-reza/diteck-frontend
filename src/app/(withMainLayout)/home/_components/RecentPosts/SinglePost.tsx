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

const SinglePost = ({ post }: { post: IPost }) => {
  const { category, date, author, title, img } = post;
  return (
    <div className="flex items-center gap-10 border-y first:border-t-0 last:border-b-0 border-y-black py-10 relative group transition-all duration-600">
      <div className="relative min-w-[220] h-[220px] rounded-[20px]">
        <Image
          src={img}
          alt={title}
          fill
          className="rounded-[20px] object-cover"
        />
      </div>
      <div>
        <div className="flex gap-2 text-[12px] font-semibold uppercase mb-4">
          <p className="text-primary hover:text-light transition-colors duration-300">
            {category}
          </p>
          <p className="text-light">{date}</p>
          <p className="text-light">{author}</p>
        </div>
        <h3>
          <Link
            href="#"
            className="text-[20px] lg:text-[28px] font-semibold hover:text-primary transition-colors duration-300"
          >
            {title}
          </Link>
        </h3>
      </div>
      <div className="absolute right-0 top-[50%] transform -translate-y-[50%] group-hover:flex items-center ml-auto p-4 bg-primary text-white rounded-[15px] hidden transition-all duration-600">
        <Link href="#">
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default SinglePost;
