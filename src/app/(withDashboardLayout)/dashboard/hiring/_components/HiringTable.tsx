"use client";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog/DeleteConfirmationDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal/Modal";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useModal } from "@/hooks/useModal";
import { useDeleteHiringPostMutation, useGetAllHiringPostQuery, useSoftDeleteHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { THiring } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import CreateUpdateHiringPost from "./CreateUpdateHiringPost";
import ViewHiring from "./ViewHiring";
import { hiringColumns } from "../_constants/constant";

const HiringTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const [singleHiring, setSingleHiring] = useState<THiring | null>();

    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: ViewIsOpen, openModal: viewOpenModal, closeModal: viewCloseModal } = useModal();

    const { data, isLoading: dataIsLoading } = useGetAllHiringPostQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    // handle view modal
    const handleViewModal = (blog: THiring) => {
        viewOpenModal()
        setSingleHiring(blog);
    }

    const handleDialog = (blog: THiring) => {
        setIsDeleteDialog(true)
        setSingleHiring(blog);
    }

    // handle edit modal
    const handleEditModal = (blog: THiring) => {
        openModal()
        setSingleHiring(blog);
    }

    // Hard Delete
    const [hardDeleteHiring, { isLoading }] = useDeleteHiringPostMutation();
    const handleHardDeleteHiring = async () => {
        if (!singleHiring?._id) return;

        try {
            await hardDeleteHiring({ id: singleHiring._id }).unwrap();
            toast.success(`Hiring "${singleHiring.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleHiring(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the Hiring. Please try again.");
        }
    };

    // Soft Delete
    const [softDeleteHiring, { isLoading: softIsLoading }] = useSoftDeleteHiringPostMutation();
    const handleSoftDeleteHiring = async () => {
        if (!singleHiring?._id) return;

        try {
            await softDeleteHiring({ id: singleHiring._id }).unwrap();
            toast.success(`Hiring "${singleHiring.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleHiring(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the Hiring. Please try again.");
        }
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <TableSearchBar
                        searchPlaceholder="Search Post Title..."
                        onSearchChange={handleSearchChange}
                        searchValue={searchTerm}
                        setLimit={setLimit}
                        limit={limit}
                    />
                    <ETable
                        isLoading={dataIsLoading}
                        columns={hiringColumns as TableColumn<THiring>[]}
                        data={data?.data as THiring[]}
                        onEdit={(row) => handleEditModal(row)}
                        onView={(row) => handleViewModal(row)}
                        onDelete={(row) => handleDialog(row)}
                        // handleStatusChanger={(row, newStatus) =>
                        //     console.log("Status Changed:", row, newStatus)
                        // }
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
                entityType="Hiring"
                onHardDelete={handleHardDeleteHiring}
                onSoftDelete={handleSoftDeleteHiring}
                entityName={singleHiring?.title as string}
                isLoading={isLoading || softIsLoading}
            />
            {/* Update Hiring */}
            <Modal isOpen={isOpen} onClose={closeModal} title='Edit Hiring Post'>
                <CreateUpdateHiringPost closeModal={closeModal} hiring={singleHiring} />
            </Modal>

            {/* View Hiring Post */}
            <Modal isOpen={ViewIsOpen} onClose={viewCloseModal} title='Hiring Post Details'>
                <ViewHiring hiring={singleHiring} />
            </Modal>
        </div>
    );
};

export default HiringTable;