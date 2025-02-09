import { SectionTitle } from "@/components/common";
import React from "react";
import { recentPosts } from "../../_constant/recentPost";
import SinglePost from "./SinglePost";

const RecentPost = () => {
  return (
    <div className="container mx-auto p-5">
      <SectionTitle
        buttonText="Recent post"
        title="Latest news and industry insights"
      />
      <div className="grid lg:grid-cols-[400px_1fr]">
        <div></div>
        <div>
          {recentPosts?.map((post, idx) => (
            <SinglePost key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
