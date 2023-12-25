import React from 'react'
import { Button } from '@mui/material'
import { Product } from '../types/product'
import { useAppSelector } from 'store'
import { addItemToCart } from 'app/cart /store/cart.slice'
import { useNavigate } from 'react-router-dom'
import { useAddItemToCartMutation } from 'app/cart /store/cartApi.slice'

type Props = {
    item: Product,
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {}
}

export default function CartButton({item, handleClick}: Props) {
    const { items } = useAppSelector((state) => state.cart)
    const [addItem] = useAddItemToCartMutation()
    const navigate = useNavigate()
    
    const currentItem = items.find(cartItem => 
        cartItem.product.id === item.id)

  return (
    <Button
        onClick={handleClick}
        variant='outlined'
        color="success"
        disabled={true}
        >
          {status}
    </Button>
  )
}