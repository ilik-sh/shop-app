import * as React from 'react';
import { Alert, AlertColor } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

type props = {
  open: boolean
  message: string
  onClose: () => void
  severity: AlertColor
}

export default function CustomSnackbar({open, message, severity, onClose}: props ) {

  return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={open}
        autoHideDuration={1500}
        onClose={onClose}
      >
        <Alert  
        onClose={onClose}
        severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}