"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { TError, TJobApplication } from "@/types";
import { useState } from "react";
import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";
import {
  useBulkDeleteJobApplicationMutation,
  useDeleteJobApplicationMutation,
  useGetAllJobApplicationQuery,
} from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";
import { jobApplicationColumns, statusOptions } from "./_constants/constant";
import BulkDeleteButton from "@/components/dashboard/BulkDelete/BulkDeleteButton";

const JobApplication = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TJobApplication | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isBulkDeleteModal, setIsBulkDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState<TJobApplication[]>([]);
  const [status, setStatus] = useState<string>("pending");

  const { data, isLoading } = useGetAllJobApplicationQuery([
    { name: "status", value: status },
    { name: "search", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: pageNumber },
  ]);

  const [
    deleteJobApplication,
    {
      isLoading: dIsloading,
      isSuccess: dIssuccess,
      isError: dIsError,
      data: dData,
      error: dError,
    },
  ] = useDeleteJobApplicationMutation();

  const [
    bulkDelete,
    {
      isLoading: bIsloading,
      isSuccess: bIssuccess,
      isError: bIsError,
      data: bData,
      error: bError,
    },
  ] = useBulkDeleteJobApplicationMutation();

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDeleteModal = (item: TJobApplication) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteJobApplication({ id: singleData?._id });
  };

  const handleBulkDelete = () => {
    const applicationIDs = selectedRows.map((item) => item._id);
    bulkDelete({ data: { applicationIDs } });
  };

  // Define dynamic status options

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Application</h1>
          <p className="text-muted-foreground">Manage your job applications</p>
        </div>
      </div>

      {/* Table with Search & Status Tabs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSearchBar
            searchPlaceholder="Search job applications..."
            onSearchChange={handleSearchChange}
            searchValue={searchTerm}
            setLimit={setLimit}
            limit={limit}
            status={status}
            setStatus={setStatus} // Pass status state handler
            statusOptions={statusOptions} // Pass dynamic status options
          />
          <BulkDeleteButton
            selectedRows={selectedRows}
            setIsDeleteModal={setIsBulkDelete}
          />
          <ETable
            checkboxMode={true}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            isLoading={isLoading}
            columns={jobApplicationColumns as TableColumn<TJobApplication>[]}
            data={data?.data as TJobApplication[]}
            onView={(row) => console.log("View:", row)}
            onDelete={handleDeleteModal}
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            defaultKey="service"
          />
        </CardContent>
      </Card>

      {/* Single delete */}
      <DeleteConfirm
        isError={dIsError}
        setIsOpen={setIsDeleteModal}
        isLoading={dIsloading}
        isOpen={isDeleteModal}
        onDelete={handleDelete}
        isSuccess={dIssuccess}
        data={dData}
        error={dError as TError}
        title="Are you sure you want to delete this job application?"
      />

      {/* Bulk delete */}
      <DeleteConfirm
        isError={bIsError}
        setIsOpen={setIsBulkDelete}
        isLoading={bIsloading}
        isOpen={isBulkDeleteModal}
        onDelete={handleBulkDelete}
        isSuccess={bIssuccess}
        data={bData}
        error={bError as TError}
        title="Are you sure you want to delete these job applications?"
      />
    </div>
  );
};

export default JobApplication;
