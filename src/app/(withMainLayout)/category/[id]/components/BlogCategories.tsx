import React from "react";

const BlogCategories = () => {
  return (
    <div>
      <h3 className="text-[32px] font-medium mt-10 mb-5">Blog Categories</h3>
      <ul>
        {["Company", "Lifestyle", "Social Media", "Uncategorized"].map(
          (item, idx) => (
            <li key={idx} className="border-t py-3 text-[20px] font-medium">
              <span>{item}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BlogCategories;
