import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  onPageChange: (page: number) => void;
  page: number;
}

const CommonPagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
  page,
}) => {
  const { totalPage } = meta;

  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after the current page
    const range: number[] = [];

    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPage, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) {
      range.unshift(-1); // Add an ellipsis indicator before
    }
    if (range[0] !== 1) {
      range.unshift(1); // Always show the first page
    }

    if (range[range.length - 1] < totalPage - 1) {
      range.push(-1); // Add an ellipsis indicator after
    }
    if (range[range.length - 1] !== totalPage) {
      range.push(totalPage); // Always show the last page
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    totalPage !== 1 && (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page - 1);
                }}
              />
            </PaginationItem>
          )}

          {pageNumbers.map((pageNumber, index) =>
            pageNumber === -1 ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {page < totalPage && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page + 1);
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  );
};

export default CommonPagination;
