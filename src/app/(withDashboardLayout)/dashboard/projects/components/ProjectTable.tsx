"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useGetAllProjectsQuery } from "@/redux/api/adminApi/projectApi/projectApi";
import { TProject } from "@/types";
import { useState } from "react";

const ProjectTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const { data } = useGetAllProjectsQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const columns = [
        { key: "thumbnail", label: "Img" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description" }, // Updated "bio" to "description"
        { key: "category", label: "Category" }, // Added category
        { key: "timeTakenToDevelop", label: "Development Time" }, // Added time taken
        { key: "frontendTech", label: "Frontend Tech" }, // Added frontend tech
        { key: "backendTech", label: "Backend Tech" }, // Added backend tech
        { key: "requirement", label: "Requirement" }, // Added requirement
        { key: "createdAt", label: "Created At" }, // Added created date
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
                        columns={columns as TableColumn<TProject>[]}
                        data={data?.data as TProject[]}
                        onEdit={(row) => console.log("edit:", row)}
                        onView={(row) => console.log("View:", row)}
                        onDelete={(row) => console.log("Delete:", row)}
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
        </div>
    );
};

export default ProjectTable;