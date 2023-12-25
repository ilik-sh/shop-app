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
import { useSignInMutation } from './store/authApi.slice';
import { setTokens } from './store/auth.slice';
import { setUser } from 'app/user/store/user.slice';
import CustomSnackbar from '../../components/customSnackbar/custom.snackbar';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'components/customSnackbar/hooks/useSnackbar';


const initialValues = {
  open: false,
  message: '',
  severity: 'success'
}

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {snackbar, handleClose, openSnackbar} = useSnackbar()
 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [signIn, {isError}] = useSignInMutation()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email && password) {
        signIn({email, password})
        .unwrap()
        .then((value: {accessToken: any, refreshToken: any}) => {
            dispatch(setTokens(value))
            dispatch(setUser())
            openSnackbar("Succesfullt signed in", "success")
            navigate('/')
          })
        .catch((error) => {
          openSnackbar(error.data.errorCode, 'error')
        })
    }
  };

  return (
      <>
      <CustomSnackbar 
      open={snackbar.open} 
      message={snackbar.message} 
      severity={snackbar.severity} 
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
          Sign in
          </Typography>
          <Box>
            <Grid container spacing={0} sx={{minHeight: '20vh'}}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
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
