"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useDeleteServiceMutation } from "@/redux/api/adminApi/serviceApi/serviceApi";
import { TError, TJobApplication } from "@/types";
import { useState } from "react";
import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";
import { useGetAllJobApplicationQuery } from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";
import { jobApplicationColumns } from "./_constants/constant";
import BulkDeleteButton from "@/components/dashboard/BulkDelete/BulkDeleteButton";

const JobApplication = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TJobApplication | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<TJobApplication[]>([]);
  const { data, isLoading } = useGetAllJobApplicationQuery([]);
  const [
    deleteService,
    {
      isLoading: dIsloading,
      isSuccess: dIssuccess,
      isError: dIsError,
      data: dData,
      error: dError,
    },
  ] = useDeleteServiceMutation();

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage); // Update the current page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDeleteModal = (item: TJobApplication) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteService({ id: singleData?._id });
  };

  console.log(data);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Application</h1>
          <p className="text-muted-foreground">manage your job application</p>
        </div>
      </div>

      {/* table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSearchBar
            searchPlaceholder="Search book title"
            onSearchChange={handleSearchChange}
            searchValue={searchTerm}
            setLimit={setLimit}
            limit={limit}
          />

          <BulkDeleteButton
            selectedRows={selectedRows}
            setIsDeleteModal={setIsDeleteModal}
          ></BulkDeleteButton>
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

      <DeleteConfirm
        isError={dIsError}
        setIsOpen={setIsDeleteModal}
        isLoading={dIsloading}
        isOpen={isDeleteModal}
        onDelete={handleDelete}
        isSuccess={dIssuccess}
        data={dData}
        error={dError as TError}
        title="are you sure to delete this service?"
      ></DeleteConfirm>
    </div>
  );
};

export default JobApplication;
