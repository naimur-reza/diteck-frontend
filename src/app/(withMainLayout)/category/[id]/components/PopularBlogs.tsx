import { recentPosts } from "@/app/(withMainLayout)/home/_constant/recentPost";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopularBlogs = () => {
  return (
    <div>
      <h3 className="text-[32px] font-medium border-t lg:border-t-0 mb-5 pt-5 lg:pt-0">
        Popular Blogs
      </h3>
      <div className="flex flex-col">
        {recentPosts.map(({ img, title, date }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 py-4 border-t first:border-0"
          >
            <div className="relative min-w-[100px] min-h-[100px] rounded-[10px]">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover rounded-[10px]"
              />
            </div>
            <div>
              <h3 className="text-[18px] font-medium hover:text-primary transition-colors duration-300">
                <Link href={"#"}>{title}</Link>
              </h3>
              <span className="text-light text-sm">{date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
