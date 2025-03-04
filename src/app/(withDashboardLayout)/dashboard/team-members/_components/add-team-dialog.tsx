import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TeamMemberFormData } from "@/types/team-member";
import { Plus } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { TeamMemberForm } from "./team-member-form";

interface AddMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  resetForm: () => void;
  onAdd: (data: FieldValues) => void;
  isLoading: boolean;
}

export function AddMemberDialog({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  onAdd,
  isLoading,
}: AddMemberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to your agency team.
          </DialogDescription>
        </DialogHeader>
        <TeamMemberForm
          isLoading={isLoading}
          onSubmit={onAdd}
          formData={formData}
          setFormData={setFormData}
        />
      </DialogContent>
    </Dialog>
  );
}
