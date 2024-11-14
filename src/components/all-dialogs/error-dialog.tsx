'use client'

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";

import styles from './all-dialogs.module.css';

interface ErrorDialog {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    descriptionText: string;
}

export function ErrorDialog({ isOpen, setIsOpen, descriptionText }: ErrorDialog) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={styles.contentError}>
                <DialogHeader>
                <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                </VisuallyHidden>
                <DialogDescription className={styles.descriptionError}>
                    {descriptionText}
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}