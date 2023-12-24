import React from 'react';
import { Typography, Link, Container } from '@mui/material';

export default function Footer()  {

  return (
      <Container 
      maxWidth="xl" 
      component='footer'
      sx={{
        marginTop: 'auto',
      }}
      color='paper'>
        <Typography variant="body2" color="textSecondary" align="center">
          Shop App
        </Typography>
      </Container>
  );
};
