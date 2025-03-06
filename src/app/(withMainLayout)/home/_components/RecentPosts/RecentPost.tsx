import { SectionTitle } from "@/components/common";
import { TBlog } from "@/types";
import React from "react";
import HeaderPost from "./HeaderPost";
import SinglePost from "./SinglePost";
import getRecentPosts from "@/utils/fetchData/getRecentPosts";

const RecentPost = async () => {
  const { data: recentPosts }: { data: TBlog[] } = await getRecentPosts();

  return (
    <div className="container mx-auto p-5">
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
