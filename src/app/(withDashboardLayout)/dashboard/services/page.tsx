"use client";
import { CommonDialog } from "@/components/dashboard/CommonDialog/CommonDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "@/redux/api/adminApi/serviceApi/serviceApi";
import { TError, TService } from "@/types";
import { useState } from "react";
import AddService from "./_components/AddService";
import { columns } from "./_constant/constant";
import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";

const Services = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TService | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllServiceQuery(undefined);
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

  const handleDeleteModal = (item: TService) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteService({ id: singleData?._id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your services.</p>
        </div>
        <CommonDialog
          width={800}
          triggerLabel="New Service"
          title="Add Service"
          dialogType="create"
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        >
          <AddService></AddService>
        </CommonDialog>
      </div>

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
          <ETable
            isLoading={isLoading}
            columns={columns as TableColumn<TService>[]}
            data={data?.data as TService[]}
            onEdit={(row) => console.log("edit:", row)}
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

export default Services;
