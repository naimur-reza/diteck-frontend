import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type TableSearchBarProps = {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  limit?: number;
  status?: string; // Status is now a string to allow flexibility
  setStatus?: React.Dispatch<React.SetStateAction<string>>;
  statusOptions?: string[]; // Dynamic list of status options
};

const TableSearchBar = ({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  setLimit,
  limit,
  status,
  setStatus,
  statusOptions, // Accept dynamic status options
}: TableSearchBarProps) => {
  const handleLimitChange = (value: string) => {
    if (setLimit) {
      setLimit(Number(value));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      {/* Search Input */}
      {onSearchChange && (
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-1/4"
        />
      )}

      {/* Tabs for Status Filtering */}
      {status && setStatus && statusOptions && (
        <Tabs
          value={status}
          onValueChange={(value) => setStatus(value)} // Dynamically change status
        >
          <TabsList className="flex space-x-4 bg-muted p-1 rounded-lg">
            {statusOptions.map((statusOption) => (
              <TabsTrigger
                className="cursor-pointer"
                key={statusOption}
                value={statusOption}
              >
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Limit Selection */}
      {setLimit && limit !== undefined && (
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="border p-2 rounded w-fit">
            <SelectValue placeholder="Per Page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default TableSearchBar;
