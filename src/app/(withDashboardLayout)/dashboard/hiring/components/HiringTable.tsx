"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/Table/Table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THiring } from "@/types"; // Import the hiring type
import { useGetAllHiringPostQuery } from "@/redux/api/adminApi/hiringApi/hiring.api";

// Table columns
const columns: ColumnDef<THiring>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Job Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "companyName",
        header: "Company Name",
    },
    {
        accessorKey: "jobType",
        header: "Job Type",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "salaryRange",
        header: "Salary",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${status === "active"
                            ? "bg-green-100 text-green-700"
                            : status === "inactive"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {status}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const job = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log("View:", job._id)}>
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Edit:", job._id)}>
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// Status filter options
const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
];

const HiringTable = () => {
    const { data: hiringData, error, isLoading } = useGetAllHiringPostQuery([]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={hiringData?.data || []} // Ensure data is an array
                searchableColumn="title"
                filterOptions={statusOptions}
            />
        </div>
    );
};

export default HiringTable;
