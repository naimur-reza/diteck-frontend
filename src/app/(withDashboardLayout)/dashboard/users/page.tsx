"use client";
import { CommonDialog } from "@/components/dashboard/CommonDialog/CommonDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";

import { TAdminAndManager, TError } from "@/types";
import { useState } from "react";

import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";
import Modal from "@/components/ui/modal/Modal";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useSoftDeleteUserMutation,
} from "@/redux/api/adminApi/userApi/userApi";
import { userColumn } from "./_constants/user";
import AddAndUpdateUser from "./_components/AddAndUpdateUser";

const User = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TAdminAndManager | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isSoftDeleteModal, setIsSoftDeleteModal] = useState(false);

  const { data, isLoading } = useGetAllUserQuery([
    { name: "search", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: pageNumber },
  ]);
  const [
    deleteUser,
    {
      isLoading: dIsloading,
      isSuccess: dIssuccess,
      isError: dIsError,
      data: dData,
      error: dError,
    },
  ] = useDeleteUserMutation();
  const [
    softDeleteUser,
    {
      isLoading: sIsloading,
      isSuccess: sIssuccess,
      isError: sIsError,
      data: sData,
      error: sError,
    },
  ] = useSoftDeleteUserMutation();

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage); // Update the current page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDeleteModal = (item: TAdminAndManager) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };
  const handleSoftDeleteModal = (item: TAdminAndManager) => {
    setIsSoftDeleteModal(true);
    setSingleData(item);
  };
  const handleEditModal = (item: TAdminAndManager) => {
    setIsEditModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteUser({ id: singleData?._id });
  };
  const handleSoftDelete = () => {
    softDeleteUser({ id: singleData?._id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User</h1>
          <p className="text-muted-foreground">Manage your User.</p>
        </div>

        {/* add service */}
        <CommonDialog
          width={800}
          triggerLabel="New user"
          title="Add user"
          dialogType="create"
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        >
          <AddAndUpdateUser setIsOpen={setIsAddDialogOpen} />
        </CommonDialog>
      </div>

      {/* table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All User</CardTitle>
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
            columns={userColumn as TableColumn<TAdminAndManager>[]}
            data={data?.data as TAdminAndManager[]}
            onEdit={handleEditModal}
            onView={(row) => console.log("View:", row)}
            onDelete={handleDeleteModal}
            onSoftDelete={handleSoftDeleteModal}
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            defaultKey="service"
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        title="edit user"
      >
        <AddAndUpdateUser
          defaultValues={singleData as TAdminAndManager}
          setIsOpen={setIsEditModal}
        />
      </Modal>
      <DeleteConfirm
        isError={dIsError}
        setIsOpen={setIsDeleteModal}
        isLoading={dIsloading}
        isOpen={isDeleteModal}
        onDelete={handleDelete}
        isSuccess={dIssuccess}
        data={dData}
        error={dError as TError}
        title="are you sure to delete this user?"
      ></DeleteConfirm>
      <DeleteConfirm
        isError={sIsError}
        setIsOpen={setIsSoftDeleteModal}
        isLoading={sIsloading}
        isOpen={isSoftDeleteModal}
        onDelete={handleSoftDelete}
        isSuccess={sIssuccess}
        data={sData}
        error={sError as TError}
        title="are you sure to soft delete this user?"
      ></DeleteConfirm>
    </div>
  );
};

export default User;
