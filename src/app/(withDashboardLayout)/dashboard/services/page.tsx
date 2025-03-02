"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable from "@/components/ui/table/ETable";
import { useState } from "react";

const Services = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage); // Update the current page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your services.</p>
        </div>
        {/* <AddMemberDialog
      isOpen={isAddDialogOpen}
      setIsOpen={setIsAddDialogOpen}
      formData={formData}
      setFormData={setFormData}
      onAdd={addTeamMember}
      isLoading={isLoading}
      resetForm={resetForm}
    /> */}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <TeamMembersTable
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}

          <TableSearchBar
            searchPlaceholder="Search book title"
            onSearchChange={handleSearchChange}
            searchValue={searchTerm}
            setLimit={setLimit}
            limit={limit}
          />

          <ETable
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "status", label: "Status" },
            ]}
            data={[
              { name: "John Doe", email: "john@example.com", status: true },
              { name: "Jane Doe", email: "jane@example.com", status: false },
            ]}
            onEdit={(row) => console.log("edit:", row)}
            onView={(row) => console.log("View:", row)}
            onDelete={(row) => console.log("Delete:", row)}
            handleStatusChanger={(row, newStatus) =>
              console.log("Status Changed:", row, newStatus)
            }
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
