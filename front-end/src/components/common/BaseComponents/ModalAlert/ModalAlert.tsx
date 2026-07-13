import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export interface ConfirmModalRef {
  open: () => void;
  close: () => void;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = forwardRef<ConfirmModalRef, ConfirmModalProps>(
  (
    {
      title,
      description,
      onConfirm,
      confirmText = "Confirm",
      cancelText = "Cancel",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="inherit">
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            color="error"
            variant="contained"
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
