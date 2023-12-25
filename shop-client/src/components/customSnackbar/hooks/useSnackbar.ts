import { AlertColor } from "@mui/material";
import { useState } from "react";

export function useSnackbar() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success' as AlertColor)

    const openSnackbar = (message: string, severity: AlertColor) => {
        setMessage(message)
        setOpen(true);
        setSeverity(severity)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return {snackbar: {open, message, severity} ,handleClose, openSnackbar}
}