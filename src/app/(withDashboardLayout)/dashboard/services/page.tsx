"use client";
import { CommonDialog } from "@/components/dashboard/CommonDialog/CommonDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { useGetAllServiceQuery } from "@/redux/api/adminApi/serviceApi/serviceApi";
import { TService } from "@/types";
import { useState } from "react";
import AddService from "./_components/AddService";

const Services = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data, isLoading } = useGetAllServiceQuery(undefined);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage); // Update the current page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const columns = [
    { key: "photo", label: "Img" },
    { key: "title", label: "Title" },
    { key: "price.basePrice", label: "Base Price" },
    { key: "price.currency", label: "Currency" },
    { key: "turnAroundTime", label: "Turnaround Time" },
    { key: "status", label: "Status" },
    { key: "serviceCategory", label: "Service Category" },
  ];

  console.log(data);
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
            onDelete={(row) => console.log("Delete:", row)}
            handleStatusChanger={(row, newStatus) =>
              console.log("Status Changed:", row, newStatus)
            }
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            defaultKey="service"
          />
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      {/* <EditMemberDialog
    isOpen={isEditDialogOpen}
    setIsOpen={setIsEditDialogOpen}
    member={currentMember}
    formData={formData}
    setFormData={setFormData}
    onUpdate={updateTeamMember}
    isLoading={isLoading}
    resetForm={resetForm}
  /> */}

      {/* Delete Confirmation Dialog */}
      {/* <DeleteMemberDialog
    isOpen={isDeleteDialogOpen}
    setIsOpen={setIsDeleteDialogOpen}
    member={currentMember}
    onDelete={deleteTeamMember}
    isLoading={isLoading}
  /> */}
    </div>
  );
};

export default Services;
