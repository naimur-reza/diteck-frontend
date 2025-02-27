import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamMember, TeamMemberFormData } from "@/types/team-member";
import { TeamMemberForm } from "./team-member-form";

interface EditMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: TeamMember | null;
  formData: TeamMemberFormData;
  setFormData: (data: TeamMemberFormData) => void;
  onUpdate: () => void;
  isLoading: boolean;
  resetForm: () => void;
}

export function EditMemberDialog({
  isOpen,
  setIsOpen,
  member,
  formData,
  setFormData,
  onUpdate,
  isLoading,
  resetForm,
}: EditMemberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>Update team member information.</DialogDescription>
        </DialogHeader>
        <TeamMemberForm
          formData={formData}
          setFormData={setFormData}
          member={member}
        />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
