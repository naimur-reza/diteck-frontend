import { SectionTitle } from "@/components/common";
import { TBlog } from "@/types";
import React from "react";
import HeaderPost from "./HeaderPost";
import SinglePost from "./SinglePost";

async function getRecentPost() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/all-blog`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recent posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return { data: [] };
  }
}

const RecentPost = async () => {
  const { data: recentPosts } = (await getRecentPost()) as { data: TBlog[] };
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
