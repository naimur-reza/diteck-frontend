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
} from "lucide-react";
import Image from "next/image";
import { formatDateTime } from "@/utils";
import CommonPagination from "@/components/dashboard/pagination/Pagination";
import { TMeta } from "@/types";

interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;
  handleStatusChanger?: (row: T, newStatus: boolean) => void;
  defaultKey?: string;
  handlePageChange?: (page: number) => void;
  meta?: TMeta;
  pageNumber?: number;
}

export default function ETable<T>({
  columns,
  data,
  onEdit,
  onView,
  onDelete,
  handleStatusChanger,
  defaultKey,
  handlePageChange,
  meta,
  pageNumber,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key as string}>{col.label}</TableHead>
          ))}
          {(onEdit || onView || onDelete || handleStatusChanger) && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={col.key as string}>
                {col.key === "availabilityStatus" ||
                col.key === "status" ||
                col.key === "reviewStatus" ? (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${
                      row[col.key] === "approved"
                        ? "bg-blue-100 text-blue-700"
                        : row[col.key] === "rejected"
                        ? "bg-red-100 text-red-700"
                        : row[col.key] === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : row[col.key] === true
                        ? "bg-green-100 text-green-700"
                        : row[col.key] === false
                        ? "bg-gray-100 text-gray-700"
                        : row[col.key] === "selected"
                        ? "bg-purple-100 text-purple-700"
                        : row[col.key] === "completed"
                        ? "bg-orange-100 text-orange-700"
                        : row[col.key] === "active"
                        ? "bg-green-100 text-green-700"
                        : row[col.key] === "inactive"
                        ? "bg-gray-200 text-gray-800"
                        : row[col.key] === "blocked"
                        ? "bg-red-200 text-red-800"
                        : row[col.key] === "trialing"
                        ? "bg-blue-100 text-blue-700"
                        : row[col.key] === "resolved"
                        ? "bg-teal-100 text-teal-700"
                        : row[col.key] === "shortlisted"
                        ? "bg-indigo-100 text-indigo-700"
                        : row[col.key] === "archived"
                        ? "bg-gray-300 text-gray-900"
                        : row[col.key] === "available"
                        ? "bg-green-200 text-green-800"
                        : row[col.key] === "unavailable"
                        ? "bg-gray-400 text-gray-900"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row[col.key] === "approved"
                      ? "Approved"
                      : row[col.key] === "rejected"
                      ? "Rejected"
                      : row[col.key] === "pending"
                      ? "Pending"
                      : row[col.key] === true
                      ? "Activated"
                      : row[col.key] === false
                      ? "Deactivated"
                      : row[col.key] === "selected"
                      ? "Selected"
                      : row[col.key] === "completed"
                      ? "Completed"
                      : row[col.key] === "active"
                      ? "Active"
                      : row[col.key] === "inactive"
                      ? "Inactive"
                      : row[col.key] === "blocked"
                      ? "Blocked"
                      : row[col.key] === "trialing"
                      ? "Trialing"
                      : row[col.key] === "resolved"
                      ? "Resolved"
                      : row[col.key] === "shortlisted"
                      ? "Shortlisted"
                      : row[col.key] === "archived"
                      ? "Archived"
                      : row[col.key] === "available"
                      ? "Available"
                      : row[col.key] === "unavailable"
                      ? "Unavailable"
                      : "Unknown"}
                  </span>
                ) : col.label === "Img" ? (
                  <Image
                    width={20}
                    height={20}
                    alt=""
                    className=" rounded-md"
                    src={row[col.key] as string}
                  ></Image>
                ) : col.key === "startDate" ||
                  col.key === "endDate" ||
                  col.key === "createdAt" ||
                  col.key === "updatedAt" ||
                  col.key === "applicationDeadline" ? (
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

            {(onEdit || onView || onDelete || handleStatusChanger) && (
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    {onView && (
                      <DropdownMenuItem onClick={() => onView(row)}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </DropdownMenuItem>
                    )}
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(row)}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                    )}

                    {handleStatusChanger && (
                      <DropdownMenuItem className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {row["isActive" as keyof T] ||
                          row["status" as keyof T] ? (
                            <ToggleRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-gray-500" />
                          )}
                          <p>Status Change</p>
                        </div>
                        <Switch
                          onCheckedChange={() => {
                            const isActive = row["isActive" as keyof T];
                            const status = row["status" as keyof T];
                            handleStatusChanger(row, !isActive && !status);
                          }}
                          checked={Boolean(
                            row["isActive" as keyof T] ||
                              row["status" as keyof T]
                          )}
                        />
                      </DropdownMenuItem>
                    )}

                    {onDelete && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(row)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
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
      <div className="mt-[12px]">
        {meta && handlePageChange && pageNumber && (
          <CommonPagination
            page={pageNumber}
            meta={meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Table>
  );
}
