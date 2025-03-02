"use client";

import { TError } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: { message?: string };
  error?: TError;
  onDelete: () => void;
}

const DeleteConfirm: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title = "Confirm Deletion",
  isLoading,
  isSuccess,
  isError,
  data,
  error,
  onDelete,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting...", { id: "delete-toast" });
    } else if (isSuccess) {
      toast.success(data?.message || "Deleted successfully!", {
        id: "delete-toast",
      });
      setTimeout(() => setIsOpen(false), 1500); // Auto close after success
    } else if (isError) {
      toast.error(error?.data?.message || "An error occurred", {
        id: "delete-toast",
      });
    }
  }, [isLoading, isSuccess, isError, data, error, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                disabled={isLoading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:bg-red-400"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirm;
