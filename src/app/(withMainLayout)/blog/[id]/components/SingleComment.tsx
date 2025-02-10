import Image from "next/image";
import React from "react";

interface IComment {
  name: string;
  text: string;
  date: string;
  userImg: string;
}

const SingleComment = ({ comment }: { comment: IComment }) => {
  const { name, text, date, userImg } = comment;
  return (
    <div className="flex gap-4 items-start justify-start border-b py-6">
      <div className="relative min-w-10 min-h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden">
        <Image src={userImg} fill alt="" />
      </div>
      <div>
        <cite className="text-[16px] font-semibold text-accent block not-italic">
          {name}
        </cite>
        <time className="text-[14px] font-normal text-light mt-2">{date}</time>
        <p className="mt-3 mb-6">{text}</p>
        <button className="cursor-pointer underline-offset-1 text-accent">
          Reply
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
