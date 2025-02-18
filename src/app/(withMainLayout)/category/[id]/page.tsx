import Image from "next/image";
import Link from "next/link";
import React from "react";
import PopularTags from "./components/PopularTags";
import BlogCategories from "./components/BlogCategories";
import PopularBlogs from "./components/PopularBlogs";

const SingleCategoryPage = () => {
  return (
    <div
      className="py-20 bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
    >
      <div className="container mx-auto grid md:grid-cols-[1fr_400px] gap-10">
        <div className="grid grid-cols-3 gap-5">
          {categories.map(({ img, title }, idx) => (
            <div key={idx}>
              <div className="relative w-full h-[300px] rounded-[20px]">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
              <h3 className="text-[32px] lg:leading-[32px] font-medium mt-5 hover:text-primary transition-colors duration-300">
                <Link href={"#"}>{title}</Link>
              </h3>
            </div>
          ))}
        </div>
        <div>
          <PopularBlogs />
          <BlogCategories />
          <PopularTags />
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;

const categories = [
  {
    img: "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/project_14-1536x1152.jpg",
    title: "Social Media Campaigns",
  },
  {
    img: "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/project_8-1536x864.jpg",
    title: "Corporate Website",
  },
  {
    img: "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/project_2-1536x1152.jpg",
    title: "Knowledge Base & Live Chat",
  },
];
