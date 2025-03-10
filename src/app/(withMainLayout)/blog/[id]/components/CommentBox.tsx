import React from "react";
import SingleComment from "./SingleComment";
import { TComment } from "@/types";
import ReplyComment from "./ReplyComment";

const CommentBox = ({ comments }: { comments: TComment[] }) => {
  return (
    <div className="lg:max-w-[90%] lg:mx-[150px]">
      <p className="text-[34px] my-7 font-semibold">{comments?.length} Comments</p>
      
      {comments?.map((comment, idx) => (
        <div key={idx}>
          <SingleComment comment={comment} />
          {comment?.replies?.map((reply, idx) => <div key={idx} className="ml-16">
            <ReplyComment reply={reply} parentId={comment?._id} />
          </div>)}
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
