"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { TError, TQuery } from "@/types";
import { useState } from "react";
import DeleteConfirm from "@/components/dashboard/DeleteConfirm/DeleteConfirm";

import {
  useDeleteQueryMutation,
  useGetAllQueryQuery,
} from "@/redux/api/adminApi/queryApi/queryApi";
import { queryColumns } from "./_constants/query";
import Modal from "@/components/ui/modal/Modal";
import AssignQuery from "./_components/AssignQuery";
import ResolveQuery from "./_components/ResolveQuery";
import ViewQueryDetails from "./_components/ViewQueryDetails";

const Query = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TQuery | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isAssignQueryModal, setIsQueryModal] = useState(false);
  const [isResolveModal, setIsResolveModal] = useState(false);
  const [isViewModal, setisViewModal] = useState(false);

  const { data, isLoading, isFetching } = useGetAllQueryQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: pageNumber },
  ]);

  const [
    deleteQuery,
    {
      isLoading: dIsloading,
      isSuccess: dIssuccess,
      isError: dIsError,
      data: dData,
      error: dError,
    },
  ] = useDeleteQueryMutation();

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // handle view modal
  const handleViewModal = (job: TQuery) => {
    setSingleData(job);
  };

  const handleAssignQueryModal = (item: TQuery) => {
    setIsQueryModal(true);
    setSingleData(item);
  };
  const handleResolveQueryModal = (item: TQuery) => {
    setIsResolveModal(true);
    setSingleData(item);
  };

  const handleDeleteModal = (item: TQuery) => {
    setIsDeleteModal(true);
    setSingleData(item);
  };

  const handleDelete = () => {
    deleteQuery({ id: singleData?._id });
  };

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
        <CardContent>
          <TableSearchBar
            searchPlaceholder="Search job applications..."
            onSearchChange={handleSearchChange}
            searchValue={searchTerm}
            setLimit={setLimit}
            limit={limit}
          />

          <ETable
            isLoading={isLoading || isFetching}
            columns={queryColumns as TableColumn<TQuery>[]}
            data={data?.data as TQuery[]}
            onView={(row) => handleViewModal(row)}
            onDelete={handleDeleteModal}
            onEdit={handleAssignQueryModal}
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            defaultKey="query"
            performIfNeeded={handleResolveQueryModal}
          />
        </CardContent>
      </Card>

      {/* assign query */}
      <Modal
        isOpen={isAssignQueryModal}
        onClose={() => setIsQueryModal(false)}
        title="Assign the query"
      >
        <AssignQuery
          item={singleData as TQuery}
          setIsQueryModal={setIsQueryModal}
        ></AssignQuery>
      </Modal>

      {/* resolve query */}
      <Modal
        isOpen={isResolveModal}
        onClose={() => setIsResolveModal(false)}
        title="Resolve the query"
      >
        <ResolveQuery
          item={singleData as TQuery}
          setIsResolveModal={setIsResolveModal}
        ></ResolveQuery>
      </Modal>
      {/* view Query details */}
      <Modal
        isOpen={isViewModal}
        onClose={() => setisViewModal(false)}
        title="Resolve the query"
      >
        <ViewQueryDetails item={singleData as TQuery}></ViewQueryDetails>
      </Modal>

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
    </div>
  );
};

export default Query;
