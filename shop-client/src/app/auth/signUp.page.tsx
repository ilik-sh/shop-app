import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  CssBaseline,
  Box,
  AlertColor
} from '@mui/material';
import { useAppDispatch } from 'store';
import { useSignUpMutation } from './store/authApi.slice';
import { setTokens } from './store/auth.slice';
import { setUser } from 'app/user/store/user.slice';
import CustomSnackbar from './components/custom.snackbar';

const initialValues = {
    open: false,
    message: '',
    severity: 'success'
  }

export default function SignUpPage()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [snackbar, setSnackbar] = useState(initialValues)
 
  const dispatch = useAppDispatch()

  const [signIn, {isError}] = useSignUpMutation()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClose= () => {
    setSnackbar({
      ...snackbar,
      open: false
    })
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email && password) {
        signIn({email, password, username})
        .unwrap()
        .then(() => {
            setSnackbar({
                open: true,
                message: 'Succesfully signed up',
                severity: 'success'
              })
          })
        .catch((error) => {
          setSnackbar({
            open: true,
            message: error.data.message,
            severity: 'error'
          })
        })
    }
  };

  return (
      <>
      <CustomSnackbar 
      open={snackbar.open} 
      message={snackbar.message} 
      severity={snackbar.severity as AlertColor}
      onClose={handleClose}/>
      <Container 
        component="main" 
        maxWidth="xs">  
      <CssBaseline/>
        <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1,
          borderColor: 'grey.300',
          borderRadius: '8px',
          padding: 5
        }}
        >
          <Typography sx={{mb: 2}}component="h1" variant="h5">
          Sign up
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Grid container spacing={2} sx={{minHeight: '20vh'}}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
    </Container>
    </>
  );
};
