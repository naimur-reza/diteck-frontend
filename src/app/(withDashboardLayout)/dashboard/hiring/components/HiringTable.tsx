"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useGetAllHiringPostQuery } from "@/redux/api/adminApi/hiringApi/hiring.api";
import { THiring } from "@/types";
import { useState } from "react";

const HiringTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(50);

    const { data } = useGetAllHiringPostQuery(undefined);

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage); // Update the current page
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const columns = [
        { key: "hiringImage", label: "Photo" }, // Updated "thumbnail" to "hiringImage"
        { key: "title", label: "Title" },
        { key: "companyName", label: "Company Name" }, // Added company name
        { key: "jobType", label: "Job Type" }, // Added job type
        { key: "jobNature", label: "Job Nature" }, // Added job nature
        { key: "salaryRange", label: "Salary Range" }, // Added salary range
        { key: "location", label: "Location" }, // Added location
        { key: "experience", label: "Experience" }, // Added experience
        { key: "status", label: "Status" }, // Added status
        { key: "views", label: "Views" }, // Added views count
        { key: "applicationDeadline", label: "Application Deadline" }, // Added application deadline
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
                        columns={columns as TableColumn<THiring>[]}
                        data={data?.data as THiring[]}
                        onEdit={(row) => console.log("edit:", row)}
                        onView={(row) => console.log("View:", row)}
                        onDelete={(row) => console.log("Delete:", row)}
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
        </div>
    );
};

export default HiringTable;