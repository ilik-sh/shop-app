import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../types/product';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

type Props = {
    item: Product
  }

export default function ProductCard({item}: Props) {

  const [inCart, setInCart] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inCart) {

    }
    if (!inCart) {
      
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' }}>
      <CardMedia
        component='img'
        loading='lazy'
        sx={{ height: 140 }}
        image={item.image}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h5" color="primary">
          {item.price + '$'}
        </Typography>
        {item.stock > 0
        ? <Button
        variant='outlined'
        color='primary'
        >
          Add to cart
        </Button>
        : <Button
        variant='outlined'
        disabled={true}
        >
          Out of stock
        </Button>
      }
        
      </CardActions>
    </Card>
  );
}