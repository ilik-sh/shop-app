import React from 'react'
import { Product } from 'app/products/types/product'
import ProductCard from 'app/products/components/productCard'
import { Grid } from '@mui/material'

type Props = {
  items: Product[]
}

export default function ProductsList({items}: Props) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => {
        return (
          <Grid item display={'flex'} xs={4}>
            <ProductCard key={item.id} item={item}></ProductCard>
          </Grid>
        )
      })}
    </Grid>
  )
}