import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TTeamMember } from "@/types";
import { TeamMemberFormData } from "@/types/team-member";
import { FieldValues } from "react-hook-form";
import { TeamMemberForm } from "./team-member-form";

interface EditMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: TTeamMember | null;
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  onUpdate: (data: FieldValues) => void;
  isLoading: boolean;
}

export function EditMemberDialog({
  isOpen,
  setIsOpen,
  member,
  formData,
  setFormData,
  onUpdate,
  isLoading,
}: EditMemberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>Update team member information.</DialogDescription>
        </DialogHeader>
        <TeamMemberForm
          formData={formData}
          setFormData={setFormData}
          member={member}
          onSubmit={onUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
