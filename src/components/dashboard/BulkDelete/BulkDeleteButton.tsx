/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface BulkDeleteButtonProps {
  selectedRows: any[];
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkDeleteButton: React.FC<BulkDeleteButtonProps> = ({
  selectedRows,
  setIsDeleteModal,
}) => {
  return (
    <div className="flex justify-between items-center mt-4 mb-2">
      <div className="text-sm text-muted-foreground">
        {selectedRows.length > 0
          ? `${selectedRows.length} item(s) selected`
          : "No items selected"}
      </div>
      <button
        onClick={() => {
          if (selectedRows.length > 0) {
            setIsDeleteModal(true);
          }
        }}
        disabled={selectedRows.length === 0}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          selectedRows.length === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:from-red-600 hover:to-red-700 active:shadow-inner"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        Bulk Delete
      </button>
    </div>
  );
};

export default BulkDeleteButton;
