import { TBlog } from "@/types";
import React from "react";
import ViewItemDetails from "../../../../../components/common/ViewItemDetails/ViewItemDetails";

const ViewBlog = ({ blog }: { blog?: TBlog | null | undefined }) => {
    return (
        <div>
            <ViewItemDetails item={blog} imageFields={["thumbnail"]} />
        </div>
    );
};

export default ViewBlog;
