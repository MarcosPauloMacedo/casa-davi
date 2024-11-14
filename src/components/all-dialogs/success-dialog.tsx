'use client'

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogTitle 
} from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import styles from './all-dialogs.module.css';

interface SuccessDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    descriptionText: string;
}

export function SuccessDialog({ isOpen, setIsOpen, descriptionText }: SuccessDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={styles.contentSuccess}>
                <DialogHeader>
                <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                </VisuallyHidden>
                <DialogDescription className={styles.descriptionSuccess}>
                    {descriptionText}
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}