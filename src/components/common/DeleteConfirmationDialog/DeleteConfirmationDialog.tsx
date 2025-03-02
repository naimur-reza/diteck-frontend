import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    entityName: string;
    entityType?: string;
    onDelete: () => void;
    isLoading: boolean;
}

export function DeleteConfirmationDialog({
    isOpen,
    setIsOpen,
    entityName,
    entityType = "item",
    onDelete,
    isLoading,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {entityType}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{entityName}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : `Delete ${entityType}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
