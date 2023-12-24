
import React from 'react'
import { useGetProductsQuery } from './store/productsApi.slice'
import { Box, CircularProgress, Container } from '@mui/material'
import ProductsList from './components/productsList'

const ProductMainPage = () => {
  const {data, isLoading} = useGetProductsQuery()

  if (isLoading) {
    return (
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box>
    )
  }
  return (
    <Box m={2}>
      <Container>
        <ProductsList items={data!}></ProductsList>
      </Container>
    </Box>
    
    
  )
}

export default ProductMainPage

