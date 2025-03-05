"use client";
import { CommonDialog } from "@/components/dashboard/CommonDialog/CommonDialog";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "@/redux/api/adminApi/serviceApi/serviceApi";
import { TError, TService } from "@/types";
import { useState } from "react";
import { columns } from "./_constant/constant";
import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";
import AddAndEditService from "./_components/AddAndEditService";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import ViewService from "./_components/ViewService";

const Services = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TService | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const {
    isOpen: ViewIsOpen,
    openModal: viewOpenModal,
    closeModal: viewCloseModal,
  } = useModal();

  const { data, isLoading, isFetching } = useGetAllServiceQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "isDeleted", value: false },
    { name: "limit", value: limit },
    { name: "page", value: pageNumber },
  ]);
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

  // handle view modal
  const handleViewModal = (service: TService) => {
    viewOpenModal();
    setSingleData(service);
  };

  const handleDeleteModal = (item: TService) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };
  const handleEditModal = (item: TService) => {
    setIsEditModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteService({ id: singleData?._id });
  };

  const handleClose = () => {
    setIsEditModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your services.</p>
        </div>

        {/* add service */}
        <CommonDialog
          width={800}
          triggerLabel="New Service"
          title="Add Service"
          dialogType="create"
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        >
          <AddAndEditService setIsOpen={setIsAddDialogOpen} />
        </CommonDialog>
      </div>

      {/* table */}
      <Card>
        <CardContent>
          <TableSearchBar
            searchPlaceholder="Search Service title"
            onSearchChange={handleSearchChange}
            searchValue={searchTerm}
            setLimit={setLimit}
            limit={limit}
          />
          <ETable
            isLoading={isLoading || isFetching}
            columns={columns as TableColumn<TService>[]}
            data={data?.data as TService[]}
            onEdit={handleEditModal}
            onView={(row) => handleViewModal(row)}
            onDelete={handleDeleteModal}
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            defaultKey="service"
          />
        </CardContent>
      </Card>

      <Modal isOpen={isEditModal} onClose={handleClose} title="edit service">
        <AddAndEditService
          setIsOpen={setIsEditModal}
          defaultValues={singleData as TService}
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
        title="are you sure to delete this service?"
      />

      {/* View Service */}
      <Modal
        isOpen={ViewIsOpen}
        onClose={viewCloseModal}
        title="Service Details"
      >
        <ViewService service={singleData} />
      </Modal>
    </div>
  );
};

export default Services;
