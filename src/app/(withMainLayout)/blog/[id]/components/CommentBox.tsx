import React from "react";
import SingleComment from "./SingleComment";
import { TComment } from "@/types";
import ReplyComment from "./ReplyComment";

const CommentBox = ({ comments, blogId }: { comments: TComment[], blogId: string }) => {
  return (
    <div className="lg:max-w-[90%] lg:mx-[150px]">
      <p className="text-[34px] my-7 font-semibold">{comments?.length || 0} Comments</p>

      {comments?.map((comment, idx) => (
        <div key={idx}>
          <SingleComment comment={comment} blogId={blogId} />
          {/* Replies */}
          {comment?.replies?.map((reply, idx) => <div key={idx} className="ml-16">
            <ReplyComment reply={reply} />
          </div>)}
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
