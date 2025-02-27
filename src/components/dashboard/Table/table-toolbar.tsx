"use client";

import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumn?: string;
  filterableColumn?: string;
  filterOptions?: {
    value: string;
    label: string;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searchableColumn,
  filterableColumn,
  filterOptions,
}: DataTableToolbarProps<TData>) {
  // Only get filter value if filterableColumn exists
  const filterColumn = filterableColumn
    ? table.getColumn(filterableColumn)
    : null;
  const searchColumn = searchableColumn
    ? table.getColumn(searchableColumn)
    : null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchColumn && (
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={(searchColumn.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                searchColumn.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
        )}
        {filterColumn && filterOptions && (
          <Select
            value={(filterColumn.getFilterValue() as string) ?? ""}
            onValueChange={(value) => filterColumn.setFilterValue(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
