"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[95vh] w-full sm:max-w-2xl  overflow-hidden rounded-2xl p-4">
        <div className="sticky top-0 z-10 bg-background ">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {title && (
            <DialogHeader>
              <DialogTitle className="pr-8 text-2xl font-semibold pt-2">
                {title}
              </DialogTitle>
            </DialogHeader>
          )}
        </div>

        <div className="max-h-[calc(90vh-5rem)]  overflow-y-auto mt-6 ">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
