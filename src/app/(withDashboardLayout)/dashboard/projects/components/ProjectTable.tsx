"use client";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog/DeleteConfirmationDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useDeleteProjectMutation, useGetAllProjectsQuery, useSoftDeleteProjectMutation } from "@/redux/api/adminApi/projectApi/projectApi";
import { TProject } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const ProjectTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const [singleProject, setSingleProject] = useState<TProject | null>();


    const { data, isLoading: dataIsLoading } = useGetAllProjectsQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };


    const handleDialog = (project: TProject) => {
        setIsDeleteDialog(true)
        setSingleProject(project);
    }

    // Hard Delete
    const [hardDeleteProject, { isLoading }] = useDeleteProjectMutation();
    const handleHardDeleteProject = async () => {
        if (!singleProject?._id) return;

        try {
            await hardDeleteProject({ id: singleProject._id }).unwrap();
            toast.success(`Project "${singleProject.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleProject(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the project. Please try again.");
        }
    };

    // Soft Delete
    const [softDeleteProject, { isLoading: softIsLoading }] = useSoftDeleteProjectMutation();
    const handleSoftDeleteProject = async () => {
        if (!singleProject?._id) return;

        try {
            await softDeleteProject({ id: singleProject._id }).unwrap();
            toast.success(`Project "${singleProject.title}" deleted successfully!`);
            setIsDeleteDialog(false);
            setSingleProject(null);
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete the project. Please try again.");
        }
    };

    const columns = [
        { key: "thumbnail", label: "Img" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
        { key: "category", label: "Category" },
        { key: "timeTakenToDevelop", label: "Development Time" },
        { key: "frontendTech", label: "Frontend Tech" },
        { key: "backendTech", label: "Backend Tech" },
        { key: "requirement", label: "Requirement" },
        { key: "createdAt", label: "Created At" },
    ];

    return (
        <div>
            <Card>
                <CardContent>
                    <TableSearchBar
                        searchPlaceholder="Search Project Title..."
                        onSearchChange={handleSearchChange}
                        searchValue={searchTerm}
                        setLimit={setLimit}
                        limit={limit}
                    />
                    <ETable
                        isLoading={dataIsLoading}
                        columns={columns as TableColumn<TProject>[]}
                        data={data?.data as TProject[]}
                        onEdit={(row) => console.log("edit:", row)}
                        onView={(row) => console.log("View:", row)}
                        onDelete={(row) => handleDialog(row)}
                        handleStatusChanger={(row, newStatus) =>
                            console.log("Status Changed:", row, newStatus)
                        }
                        meta={data?.meta}
                        handlePageChange={handlePageChange}
                        pageNumber={pageNumber}
                        defaultKey="project"
                    />
                </CardContent>
            </Card>
            {/* Delete confirmation */}
            <DeleteConfirmationDialog
                isOpen={isDeleteDialog}
                setIsOpen={setIsDeleteDialog}
                entityType="Project"
                onHardDelete={handleHardDeleteProject}
                onSoftDelete={handleSoftDeleteProject}
                entityName={singleProject?.title as string}
                isLoading={isLoading || softIsLoading}
            />
        </div>
    );
};

export default ProjectTable;