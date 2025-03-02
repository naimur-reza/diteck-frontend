import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TTeamMember } from "@/types";

interface DeleteMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: TTeamMember | null;
  onDelete: () => void;
  isLoading: boolean;
}

export function DeleteMemberDialog({
  isOpen,
  setIsOpen,
  member,
  onDelete,
  isLoading,
}: DeleteMemberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Team Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {member?.name}? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
