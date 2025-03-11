import { TBlog } from "@/types";
import React from "react";
import Image from "next/image";

const ViewBlog = ({ blog }: { blog?: TBlog | null | undefined }) => {
    return (
        <div>
            <div className="relative w-full h-auto max-h-[350px] mb-10">
                <Image
                    src={blog?.thumbnail || ""}
                    alt={blog?.title || ""}
                    width={500}
                    height={300}
                    layout="responsive"
                    className="rounded-md border max-h-[350px] object-cover"
                />
            </div>
            <span className="bg-blue-50 text-sm text-blue-500 py-2 px-3 rounded-md font-medium inline-block">{blog?.category}</span>
            <h3 className="text-[32px] font-semibold">{blog?.title}</h3>
            <p className="text-light mb-10">{blog?.bio}</p>
            <article
                className="blog-content mt-12"
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />
        </div>
    );
};

export default ViewBlog;
