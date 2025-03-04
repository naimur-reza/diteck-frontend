"use client";
import TableSearchBar from "@/components/dashboard/searchBar/TableSearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ETable, { TableColumn } from "@/components/ui/table/ETable";
import { TError, TReview } from "@/types";
import { useState } from "react";

import {
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/api/adminApi/reviewApi/reviewApi";
import Modal from "@/components/ui/modal/Modal";
import ViewReviews from "./_components/ViewReviews";
import { reviewColumns, reviewStatusOptions } from "./_constants/review";
import { useNotification } from "@/hooks/useNotification";

const Reviews = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(50);
  const [singleData, setSingleData] = useState<TReview | null>(null);
  const [viewDetailsModal, setSingleViewDetailsModal] =
    useState<boolean>(false);
  const [status, setStatus] = useState<string>("pending");

  const { data, isLoading, isFetching } = useGetAllReviewsQuery([
    { name: "reviewStatus", value: status },
    { name: "search", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: pageNumber },
  ]);

  const [
    updateStatus,
    {
      isLoading: uIsLoading,
      isError: uIsError,
      isSuccess: uIsSuccess,
      data: uData,
      error: uError,
    },
  ] = useUpdateReviewStatusMutation();

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  const handleView = (item: TReview) => {
    setSingleViewDetailsModal(true);
    setSingleData(item);
  };

  const handleApprovedAndRejected = (item: TReview, status: string) => {
    updateStatus({ reviewID: item._id, reviewStatus: status });
  };

  useNotification({
    isLoading: uIsLoading,
    isSuccess: uIsSuccess,
    data: uData,
    error: uError as TError,
    isError: uIsError,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Reviews</h1>
          <p className="text-muted-foreground">Manage user reviews</p>
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
            setStatus={setStatus}
            statusOptions={reviewStatusOptions}
          />

          <ETable
            isLoading={isLoading || isFetching}
            columns={reviewColumns as TableColumn<TReview>[]}
            data={data?.data as TReview[]}
            onView={handleView}
            meta={data?.meta}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
            handleApprovedAndRejected={handleApprovedAndRejected}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={viewDetailsModal}
        onClose={() => setSingleViewDetailsModal(!viewDetailsModal)}
        title="View Details Review"
      >
        <ViewReviews item={singleData as TReview} />
      </Modal>
    </div>
  );
};

export default Reviews;
