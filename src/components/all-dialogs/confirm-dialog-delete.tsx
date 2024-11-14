import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "../ui/dialog";

import styles from './all-dialogs.module.css';

interface ConfirmDialogProps{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    description?: string;
    event: () => void;
}

export function ConfirmDialogDelete(
  { isOpen, setIsOpen, event, description }: ConfirmDialogProps) {
  const descriptionText = description || "Deseja apagar o item selecionado?"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={styles.contentDel}>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <DialogDescription className={styles.descriptionDel}>
            {descriptionText}
            <Button 
              onClick={event} 
              variant="destructive" 
              className={styles.buttonDel}
            >Apagar</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}