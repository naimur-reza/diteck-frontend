import { TBlog } from "@/types";
import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BlogNavigator = ({ currentPostId, posts }: { currentPostId: string, posts: TBlog[] }) => {
  // Filter out deleted posts
  const validPosts = posts?.filter((post) => !post.isDeleted);

  // Find the index of the current post
  const currentIndex = validPosts.findIndex((post) => post._id === currentPostId);

  // Get previous and next posts
  const prevPost = currentIndex > 0 ? validPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < validPosts.length - 1 ? validPosts[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-2 lg:max-w-[90%] lg:mx-[150px] px-2 py-5 md:p-10 border-y border-black mt-10 gap-5 md:gap-10">
      {/* Previous Post */}
      <div className="flex items-center gap-5">
        {prevPost ? (
          <div className="flex items-end flex-col justify-end gap-5">
            <span className="text-[12px] text-right font-semibold uppercase text-light flex items-center gap-1">
              <FaChevronLeft /> <span>Previous Post</span>
            </span>
            <div>
              <h5 className="text-[24px] font-medium text-right">
                <Link
                  href={`/blog/${prevPost?._id}`}
                  className="text-[24px] hover:text-primary transition-colors duration-300"
                >
                  {prevPost?.title}
                </Link>
              </h5>
            </div>
          </div>
        ) : (
          <span className="text-[12px] text-gray-400">No Previous Post</span>
        )}
      </div>

      {/* Next Post */}
      <div className="flex items-center gap-5">
        {nextPost ? (
          <div className="flex flex-col gap-5">
            <span className="text-[12px] font-semibold uppercase text-light flex items-center gap-1">
              <span>Next Post</span>
              <FaChevronRight />
            </span>
            <div>
              <h5 className="text-[24px] font-medium">
                <Link
                  href={`/blog/${nextPost?._id}`}
                  className="text-[24px] hover:text-primary transition-colors duration-300"
                >
                  {nextPost?.title}
                </Link>
              </h5>
            </div>
          </div>
        ) : (
          <span className="text-[12px] text-gray-400">No Next Post</span>
        )}
      </div>
    </div>
  );
};

export default BlogNavigator;
