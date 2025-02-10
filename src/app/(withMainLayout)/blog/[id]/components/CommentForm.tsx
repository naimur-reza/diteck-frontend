import React from "react";
import SingleComment from "./SingleComment";

const comment = {
  name: "John Doe",
  text: "This is exactly what i was looking for, thank you so much for these tutorials",
  date: "6 Dec 2024",
  userImg:
    "https://secure.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=80&d=mm&r=g",
};

const CommentForm = () => {
  return (
    <div className="max-w-[90%] mx-[150px]">
      <p className="text-[34px] my-7 font-semibold">3 Comments</p>
      {[1, 2].map((_, idx) => (
        <div key={idx}>
          <SingleComment comment={comment} />
          <div className="ml-16">
            <SingleComment comment={comment} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentForm;
