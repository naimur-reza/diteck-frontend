import { TBlog } from "@/types";
import React from "react";
import ItemDetails from "./ItemDetails";

const ViewBlog = ({ blog }: { blog?: TBlog | null | undefined }) => {
    return (
        <div>
            <ItemDetails item={blog} imageFields={["thumbnail"]}/>
        </div>
    );
};

export default ViewBlog;
