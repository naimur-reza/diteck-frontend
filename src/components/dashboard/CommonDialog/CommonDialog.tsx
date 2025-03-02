import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface CommonDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
  triggerLabel: string;
  dialogType?: string; // Can be any string, not just "edit" or "create"
  description?: string;
}

export function CommonDialog({
  isOpen,
  setIsOpen,
  children,
  title,
  triggerLabel,
  dialogType,
  description,
}: CommonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          {dialogType === "create" && <Plus className="mr-2 h-4 w-4" />}
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] w-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
