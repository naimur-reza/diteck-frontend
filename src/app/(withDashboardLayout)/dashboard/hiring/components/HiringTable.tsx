"use client";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog/DeleteConfirmationDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useDeleteHiringPostMutation, useGetAllHiringPostQuery, useSoftDeleteHiringPostMutation } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { THiring } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const HiringTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const [singleHiring, setSingleHiring] = useState<THiring | null>();

    const { data, isLoading: dataIsLoading } = useGetAllHiringPostQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleDialog = (blog: THiring) => {
        setIsDeleteDialog(true)
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



    const columns = [
        { key: "title", label: "Title" },
        { key: "jobType", label: "Job Type" },
        { key: "jobNature", label: "Job Nature" },
        { key: "salaryRange", label: "Salary Range" },
        { key: "experience", label: "Experience" },
        { key: "status", label: "Status" },
        { key: "views", label: "Views" },
        { key: "applicationDeadline", label: "Application Deadline" },
    ];

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
                        columns={columns as TableColumn<THiring>[]}
                        data={data?.data as THiring[]}
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
                entityType="Hiring"
                onHardDelete={handleHardDeleteHiring}
                onSoftDelete={handleSoftDeleteHiring}
                entityName={singleHiring?.title as string}
                isLoading={isLoading || softIsLoading}
            />
        </div>
    );
};

export default HiringTable;