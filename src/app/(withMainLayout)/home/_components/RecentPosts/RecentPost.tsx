import { SectionTitle } from "@/components/common";
import React from "react";
import { recentPosts } from "../../_constant/recentPost";
import SinglePost from "./SinglePost";
import HeaderPost from "./HeaderPost";

const RecentPost = () => {
  return (
    <div className="container mx-auto p-5 mt-10 mb-20">
      <SectionTitle
        buttonText="Recent post"
        title="Latest news and industry insights"
      />
      <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr]">
        <div></div>
        <div>
          <HeaderPost post={recentPosts[0]} />
          <div className="mb-[100px]">
            {recentPosts?.map((post, idx) => (
              <SinglePost key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
