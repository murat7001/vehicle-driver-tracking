import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const ConfirmModal = ({ open, handleClose, handleConfirm, message }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Deletion Confirmation</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
