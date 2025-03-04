/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { formatDateTime } from "@/utils";
import CommonPagination from "@/components/dashboard/pagination/Pagination";
import { TMeta } from "@/types";
export type TableColumn<T> = {
  label: string;
  key: keyof T;
};
interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;
  onSoftDelete?: (row: T) => void;
  handleStatusChanger?: (row: T, newStatus: boolean) => void;
  defaultKey?: string;
  handlePageChange?: (page: number) => void;
  meta?: TMeta;
  pageNumber?: number;
  isLoading: boolean;
  checkboxMode?: boolean;
  selectedRows?: any[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<T[]>>;
  performIfNeeded?: (row: T) => void;
  handleApprovedAndRejected?: (row: T, status: "approved" | "rejected") => void;
}

export default function ETable<T>({
  columns,
  data,
  onEdit,
  onView,
  onDelete,
  onSoftDelete,
  handleStatusChanger,
  defaultKey,
  handlePageChange,
  meta,
  pageNumber,
  isLoading,
  checkboxMode = false,
  selectedRows = [],
  setSelectedRows,
  performIfNeeded,
  handleApprovedAndRejected,
}: DataTableProps<T>) {
  // Handle Checkbox Selection
  const handleRowSelect = (row: T) => {
    if (setSelectedRows) {
      let updatedSelection = [...selectedRows];
      if (updatedSelection.includes(row)) {
        updatedSelection = updatedSelection.filter((r) => r !== row);
      } else {
        updatedSelection.push(row);
      }

      setSelectedRows(updatedSelection);
    }
  };

  if (isLoading) {
    return <>loading ...</>;
  }
  if (data?.length == 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-xl font-bold text-gray-700">No data found</h2>
      </div>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {checkboxMode && <TableHead>Select</TableHead>}
            {columns?.map((col) => (
              <TableHead key={col.key as string}>{col.label}</TableHead>
            ))}
            {(onEdit ||
              onView ||
              onDelete ||
              onSoftDelete ||
              handleStatusChanger ||
              performIfNeeded) && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {checkboxMode && (
                <TableCell className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                    className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-md bg-white cursor-pointer transition-all duration-300 checked:border-blue-500 checked:bg-blue-500 checked:ring-2 checked:ring-blue-300 focus:outline-none hover:border-blue-400"
                  />
                </TableCell>
              )}
              {columns?.map((col) => (
                <TableCell key={col.key as string}>
                  {col.key === "availabilityStatus" ||
                  col.key === "status" ||
                  col.key === "reviewStatus" ||
                  col.key === "user.status" ? (
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${
                        getNestedValue(row, col.key as string) === "approved"
                          ? "bg-blue-100 text-blue-700"
                          : getNestedValue(row, col.key as string) ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : getNestedValue(row, col.key as string) === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : row[col.key] === true
                          ? "bg-green-100 text-green-700"
                          : row[col.key] === false
                          ? "bg-gray-100 text-gray-700"
                          : getNestedValue(row, col.key as string) ===
                            "selected"
                          ? "bg-purple-100 text-purple-700"
                          : getNestedValue(row, col.key as string) ===
                            "completed"
                          ? "bg-orange-100 text-orange-700"
                          : getNestedValue(row, col.key as string) === "active"
                          ? "bg-green-100 text-green-700"
                          : getNestedValue(row, col.key as string) ===
                            "inactive"
                          ? "bg-gray-200 text-gray-800"
                          : getNestedValue(row, col.key as string) === "blocked"
                          ? "bg-red-200 text-red-800"
                          : getNestedValue(row, col.key as string) ===
                            "trialing"
                          ? "bg-blue-100 text-blue-700"
                          : getNestedValue(row, col.key as string) ===
                            "resolved"
                          ? "bg-teal-100 text-teal-700"
                          : getNestedValue(row, col.key as string) ===
                            "shortlisted"
                          ? "bg-indigo-100 text-indigo-700"
                          : getNestedValue(row, col.key as string) ===
                            "archived"
                          ? "bg-gray-300 text-gray-900"
                          : getNestedValue(row, col.key as string) ===
                            "available"
                          ? "bg-green-200 text-green-800"
                          : getNestedValue(row, col.key as string) ===
                            "unavailable"
                          ? "bg-gray-400 text-gray-900"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {getNestedValue(row, col.key as string) === "approved"
                        ? "Approved"
                        : getNestedValue(row, col.key as string) === "rejected"
                        ? "Rejected"
                        : getNestedValue(row, col.key as string) === "pending"
                        ? "Pending"
                        : getNestedValue(row, col.key as string) === true
                        ? "Activated"
                        : getNestedValue(row, col.key as string) === false
                        ? "Deactivated"
                        : getNestedValue(row, col.key as string) === "selected"
                        ? "Selected"
                        : getNestedValue(row, col.key as string) === "completed"
                        ? "Completed"
                        : getNestedValue(row, col.key as string) === "active"
                        ? "Active"
                        : getNestedValue(row, col.key as string) === "inactive"
                        ? "Inactive"
                        : getNestedValue(row, col.key as string) === "blocked"
                        ? "Blocked"
                        : getNestedValue(row, col.key as string) === "trialing"
                        ? "Trialing"
                        : getNestedValue(row, col.key as string) === "resolved"
                        ? "Resolved"
                        : getNestedValue(row, col.key as string) ===
                          "shortlisted"
                        ? "Shortlisted"
                        : getNestedValue(row, col.key as string) === "archived"
                        ? "Archived"
                        : getNestedValue(row, col.key as string) === "available"
                        ? "Available"
                        : getNestedValue(row, col.key as string) ===
                          "unavailable"
                        ? "Unavailable"
                        : "Unknown"}
                    </span>
                  ) : col.label === "Img" ||
                    col.label === "Thumbnail" ||
                    col.label === "Photo" ? (
                    <PhotoProvider>
                      <PhotoView src={String(row[col.key] ?? "")}>
                        {typeof row[col.key] === "string" &&
                        (row[col.key] as string).startsWith("http") ? (
                          <Image
                            width={30}
                            height={30}
                            alt={col.label}
                            className="rounded-md"
                            src={row[col.key] as string}
                          />
                        ) : (
                          <span className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-md"></span>
                        )}
                      </PhotoView>
                    </PhotoProvider>
                  ) : col.key === "startDate" ||
                    col.key === "endDate" ||
                    col.key === "createdAt" ||
                    col.key === "updatedAt" ||
                    col.key === "applicationDeadline" ||
                    col.key === "submissionDate" ? (
                    formatDateTime(row[col.key] as string)
                  ) : col.key === "packageId.packagePrice" ? (
                    `${String(getNestedValue(row, col.key as string) ?? "-")}$`
                  ) : String(row[col.key as keyof T] ?? "-").length > 20 ? (
                    `${String(getNestedValue(row, col.key as string)).slice(
                      0,
                      20
                    )}...`
                  ) : (
                    String(getNestedValue(row, col.key as string) ?? "-")
                  )}
                </TableCell>
              ))}

              {(onEdit ||
                onView ||
                onDelete ||
                onSoftDelete ||
                handleStatusChanger ||
                handleApprovedAndRejected) && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="cursor-pointer" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      {performIfNeeded && defaultKey === "jobApplication" && (
                        <DropdownMenuItem
                          className="cursor-pointer flex items-center space-x-2"
                          onClick={() => performIfNeeded(row)}
                        >
                          <CheckCircle className="text-green-500" />{" "}
                          <span>make shortlisted</span>{" "}
                        </DropdownMenuItem>
                      )}
                      {handleApprovedAndRejected && (
                        <>
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center space-x-2"
                            onClick={() =>
                              handleApprovedAndRejected(row, "approved")
                            }
                          >
                            <CheckCircle className="text-green-500" />
                            <span>Approve</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer flex items-center space-x-2"
                            onClick={() =>
                              handleApprovedAndRejected(row, "rejected")
                            }
                          >
                            <XCircle className="text-red-500" />
                            <span>Reject</span>
                          </DropdownMenuItem>
                        </>
                      )}

                      {onView && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => onView(row)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                      )}
                      {onEdit && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                      )}

                      {handleStatusChanger && (
                        <DropdownMenuItem className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <p>Status Change</p>
                          </div>
                          <Switch
                            className="cursor-pointer"
                            onCheckedChange={() => {
                              const isActive = row["isActive" as keyof T];
                              const status = row["status" as keyof T];
                              const user = row["user" as keyof T] as {
                                status?: string;
                              };
                              const userStatus = user?.status === "active";

                              handleStatusChanger(
                                row,
                                !isActive || !status || !userStatus
                              );
                            }}
                            checked={Boolean(
                              row["isActive" as keyof T] ||
                                row["status" as keyof T] ||
                                (row["user" as keyof T] as { status?: string })
                                  ?.status === "active"
                            )}
                          />
                        </DropdownMenuItem>
                      )}

                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete(row)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </>
                      )}
                      {onSoftDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onSoftDelete(row)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Soft Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-[12px]">
        {meta && handlePageChange && pageNumber && (
          <CommonPagination
            page={pageNumber}
            meta={meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
