import Image from "next/image";
import React from "react";
import CommentBox from "./components/CommentBox";
import CommentForm from "./components/CommentForm";
import getSingleBlog from "@/utils/fetchData/getSingleBlog";
import { TBlog } from "@/types";
import BlogNavigator from "./components/BlogNavigator";
import getRecentPosts from "@/utils/fetchData/getRecentPosts";
// import TagAndShare from "./components/TagAndShare";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogDetailPage = async ({ params }: { params: any }) => {
  const data = await getSingleBlog(params?.id);
  const { data: blog }: { data: TBlog } = data;

  const { data: recentPosts }: { data: TBlog[] } = await getRecentPosts();

  if (data.error) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p>{data.error}</p>
      </div>
    );
  }

  if (!recentPosts || recentPosts?.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-bold">No Recent Posts</h2>
        <p className="text-gray-500">
          There are no blog posts available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto bg-no-repeat bg-contain"
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
    >
      <div className="pt-5 md:pt-10 lg:pt-40 pb-20">
        {/* Category, Date and Author */}
        <div className="flex justify-center items-center gap-5">
          <button className="border border-[#636EDF4D] w-fit lg:min-w-fit rounded-[10px] text-black text-[14px] md:text-[18px] px-4 py-1.5  flex items-center gap-2 hover:bg-gray-200 transition">
            <span className="w-2 h-2 rounded-[1px] bg-[#636EDF] animate-pulse"></span>
            {blog?.category || "Category"}
          </button>
          <div className="flex gap-2 text-[12px] font-semibold uppercase">
            <p className="text-light">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-light">{blog?.author?.role}</p>
          </div>
        </div>

        {/* Main Content */}
        <article>
          {/* Title */}
          <div>
            <h2 className="text-[30px] md:text-[52px] lg:text-[80px] font-semibold text-center lg:max-w-[90%] mx-auto mt-5">
              {blog?.title}
            </h2>
          </div>
          <div className="relative w-full min-h-[150px] md:min-h-[300px] lg:min-h-[600px] rounded-[40px] mt-10">
            <Image
              src={blog?.thumbnail}
              fill
              alt={blog?.title}
              className="rounded-[40px] object-cover"
            />
          </div>

          {/* Bio */}
          <div className="lg:mx-[150px] mt-10 md:text-[20px] text-light">
            {/* Blog bio */}
            <p>{blog?.bio}</p>

            {/* Blog content */}
            <article
              className="blog-content mt-12"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />
          </div>
        </article>

        {/* Tags and social share */}
        {/* <TagAndShare /> */}

        {/* Blog Navigator */}
        <BlogNavigator currentPostId={blog?._id} posts={recentPosts} />

        {/* Comments box */}
        <CommentBox comments={blog?.comments} blogId={blog?._id} />

        {/* New Comments form */}
        <CommentForm blogId={blog?._id} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
