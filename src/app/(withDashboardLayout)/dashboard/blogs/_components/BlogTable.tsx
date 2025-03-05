"use client";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog/DeleteConfirmationDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal/Modal";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useModal } from "@/hooks/useModal";
import { useDeleteBlogMutation, useGetAllBlogsQuery, useSoftDeleteBlogMutation } from "@/redux/api/adminApi/blogApi/blogApi";
import { TBlog } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import CreateUpdateBlog from "./CreateUpdateBlog";
import ViewBlog from "./ViewBlog";
import { blogColumns } from "../_constants/constant";

const BlogTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);
    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const [singleBlog, setSingleBlog] = useState<TBlog | null>();

    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: ViewIsOpen, openModal: viewOpenModal, closeModal: viewCloseModal } = useModal();

    const { data, isLoading: dataIsLoading, isFetching } = useGetAllBlogsQuery([
        { name: "searchTerm", value: searchTerm },
        { name: "isDeleted", value: false },
        { name: "limit", value: limit },
        { name: "page", value: pageNumber },
    ]);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    // handle view modal
    const handleViewModal = (blog: TBlog) => {
        viewOpenModal()
        setSingleBlog(blog);
    }

    // handle edit modal
    const handleEditModal = (blog: TBlog) => {
        openModal()
        setSingleBlog(blog);
    }

    // delete modal
    const handleDialog = (blog: TBlog) => {
        setIsDeleteDialog(true)
        setSingleBlog(blog);
    }

    // Hard Delete
    const [hardDeleteBlog, { isLoading }] = useDeleteBlogMutation();
    const handleHardDeleteBlog = async () => {
        if (!singleBlog?._id) return;

        try {
            await hardDeleteBlog({ id: singleBlog._id }).unwrap();
            toast.success(`Blog "${singleBlog.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleBlog(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the blog. Please try again.");
        }
    };

    // Soft Delete
    const [softDeleteBlog, { isLoading: softIsLoading }] = useSoftDeleteBlogMutation();
    const handleSoftDeleteBlog = async () => {
        if (!singleBlog?._id) return;

        try {
            await softDeleteBlog({ id: singleBlog._id }).unwrap();
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
                        isLoading={dataIsLoading || isFetching}
                        columns={blogColumns as TableColumn<TBlog>[]}
                        data={data?.data as TBlog[]}
                        onEdit={(row) => handleEditModal(row)}
                        onView={(row) => handleViewModal(row)}
                        onDelete={(row) => handleDialog(row)}
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
                onHardDelete={handleHardDeleteBlog}
                onSoftDelete={handleSoftDeleteBlog}
                entityName={singleBlog?.title as string}
                isLoading={isLoading || softIsLoading}
            />

            {/* Update blog */}
            <Modal isOpen={isOpen} onClose={closeModal} title='Edit Blog'>
                <CreateUpdateBlog closeModal={closeModal} blog={singleBlog} />
            </Modal>

            {/* View blog */}
            <Modal isOpen={ViewIsOpen} onClose={viewCloseModal} title='Blog Details'>
                <ViewBlog blog={singleBlog} />
            </Modal>
        </div>
    );
};

export default BlogTable;