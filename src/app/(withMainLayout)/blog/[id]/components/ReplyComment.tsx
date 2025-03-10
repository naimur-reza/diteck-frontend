import { TComment } from "@/types";
import Image from "next/image";
import React from "react";

const ReplyComment = ({ reply, parentId }: { reply: TComment, parentId: string }) => {
  const { commenterName, text, createdAt } = reply;

  return (
    <div className="flex gap-4 items-start justify-start border-b py-6">
      <div className="relative min-w-10 min-h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden">
        <Image src={`https://avatar.iran.liara.run/username?username=${commenterName}`} fill
          alt={commenterName}
        />
      </div>
      <div>
        <cite className="text-[16px] font-semibold text-accent block not-italic">
          {commenterName}
        </cite>
        <time className="text-[14px] font-normal text-light mt-2">{createdAt && new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
        <p className="mt-3 mb-6">{text}</p>
        {/* <button className="cursor-pointer underline-offset-1 text-accent">
          Reply
        </button> */}
      </div>
    </div>
  );
};

export default ReplyComment;
