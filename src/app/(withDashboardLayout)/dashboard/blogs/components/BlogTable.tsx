"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useGetAllBlogsQuery } from "@/redux/api/adminApi/blogApi/blogApi";
import { TBlog } from "@/types";
import { useState } from "react";

const BlogTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const { data } = useGetAllBlogsQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const columns = [
        { key: "thumbnail", label: "Img" },
        { key: "title", label: "Title" },
        { key: "bio", label: "Bio" },
        { key: "content", label: "Content" },
    ];

    return (
        <div>
            <Card>
                <CardContent>
                    <TableSearchBar
                        searchPlaceholder="Search Blog Title..."
                        onSearchChange={handleSearchChange}
                        searchValue={searchTerm}
                        setLimit={setLimit}
                        limit={limit}
                    />
                    <ETable
                        columns={columns as TableColumn<TBlog>[]}
                        data={data?.data as TBlog[]}
                        onEdit={(row) => console.log("edit:", row)}
                        onView={(row) => console.log("View:", row)}
                        onDelete={(row) => console.log("Delete:", row)}
                        handleStatusChanger={(row, newStatus) =>
                            console.log("Status Changed:", row, newStatus)
                        }
                        meta={data?.meta}
                        handlePageChange={handlePageChange}
                        pageNumber={pageNumber}
                        defaultKey="service"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogTable;