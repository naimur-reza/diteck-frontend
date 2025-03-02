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
    onHardDelete: () => void;
    onSoftDelete?: () => void;
    isLoading: boolean;
}

export function DeleteConfirmationDialog({
    isOpen,
    setIsOpen,
    entityName,
    entityType = "item",
    onHardDelete,
    onSoftDelete,
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
                    <Button variant="default" onClick={onSoftDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : `Soft Delete`}
                    </Button>
                    <Button variant="destructive" onClick={onHardDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : `Hard Delete`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
