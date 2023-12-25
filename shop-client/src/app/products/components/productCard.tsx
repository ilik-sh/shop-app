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
import { useAddItemToCartMutation } from 'app/cart /store/cartApi.slice';
import { useAppDispatch } from 'store';
import { OrderItem } from 'app/cart /types/orderItem';
import { addItemToCart } from 'app/cart /store/cart.slice';
import CustomSnackbar from 'components/customSnackbar/custom.snackbar';
import { AlertColor } from '@mui/material';
import { useSnackbar } from 'components/customSnackbar/hooks/useSnackbar';

type Props = {
    item: Product
  }

export default function ProductCard({item}: Props) {

  const [inCart, setInCart] = useState(false)
  const {snackbar, openSnackbar, handleClose} = useSnackbar()

  const dispatch = useAppDispatch()

  const [addItem] = useAddItemToCartMutation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const productId = item.id
    addItem(productId)
    .unwrap()
    .then((item: OrderItem) => {
      console.log(item) 
      dispatch(addItemToCart(item))
      openSnackbar(`${item.product.name} added to cart`, 'success') 
    })
    .catch((error) => {
      console.log(error)
      openSnackbar(error.message.errorCode , 'error')
    })
  };

  return (
    <>
      <CustomSnackbar 
      open={snackbar.open} 
      message={snackbar.message} 
      severity={snackbar.severity} 
      onClose={handleClose}/>
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
         <Button
        onClick={handleClick}
        variant='outlined'
        color="success"
        disabled={item.stock < 0}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
    </>
    
  );
}