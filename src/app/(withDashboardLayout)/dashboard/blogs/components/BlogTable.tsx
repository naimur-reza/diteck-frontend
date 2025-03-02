"use client";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog/DeleteConfirmationDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/redux/api/adminApi/blogApi/blogApi";
import { TBlog } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const BlogTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);
    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const [singleBlog, setSingleBlog] = useState<TBlog | null>();

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

    const handleDialog = (blog: TBlog) => {
        setIsDeleteDialog(true)
        setSingleBlog(blog);
    }
    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

    const handleDeleteBlog = async () => {
        if (!singleBlog?._id) return;

        try {
            await deleteBlog({ id: singleBlog._id }).unwrap();
            toast.success(`Blog "${singleBlog.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleBlog(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the blog. Please try again.");
        }
    };

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
                        onDelete={(row) => handleDialog(row)}
                        handleStatusChanger={(row, newStatus) =>
                            console.log("Status Changed:", row, newStatus)
                        }
                        meta={data?.meta}
                        handlePageChange={handlePageChange}
                        pageNumber={pageNumber}
                        defaultKey="blog"
                    />
                </CardContent>
            </Card>
            {/* Delete confirmation */}
            <DeleteConfirmationDialog
                isOpen={isDeleteDialog}
                setIsOpen={setIsDeleteDialog}
                entityType="Blog"
                onDelete={handleDeleteBlog}
                entityName={singleBlog?.title as string}
                isLoading={isLoading}
            />
        </div>
    );
};

export default BlogTable;