/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "@/components/ui/input";
// Import the Plus icon

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import shadcn/ui Select components

type SearchAndActionBarProps = {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  limit?: number;
  defaultKey?: string;
};

const TableSearchBar = ({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  setLimit,
  limit,
  defaultKey,
}: SearchAndActionBarProps) => {
  const handleLimitChange = (value: string) => {
    if (setLimit) {
      setLimit(Number(value));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      {onSearchChange && (
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-1/4"
        />
      )}

      <div className="flex items-center gap-4">
        {setLimit && limit !== undefined && (
          <Select
            value={limit.toString()} // Bind limit to the select value
            onValueChange={handleLimitChange}
          >
            <SelectTrigger className="border p-2 rounded">
              <SelectValue placeholder="Per Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="70">70</SelectItem>
              <SelectItem value="80">80</SelectItem>
              <SelectItem value="90">90</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default TableSearchBar;
