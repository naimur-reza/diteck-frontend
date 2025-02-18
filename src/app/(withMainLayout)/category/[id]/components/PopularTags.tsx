import Link from "next/link";
import React from "react";

const PopularTags = () => {
  return (
    <div>
      <h3 className="text-[32px] font-medium mt-10 mb-5">Popular Tags</h3>
      <div className="flex gap-5 flex-wrap items-center">
        {["Hotel", "Lifestyle", "Luxury", "Resort"].map((tag, idx) => (
          <Link
            href="#"
            key={idx}
            className="border px-2 py-1 rounded-md text-light hover:bg-primary hover:text-white transition-colors duration-300"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
