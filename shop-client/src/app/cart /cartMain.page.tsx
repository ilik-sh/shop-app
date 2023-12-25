
import React from 'react'
import { useGetCartQuery } from './store/cartApi.slice'
import { CircularProgress } from '@mui/material'

export default function CartMainPage() {

  const {data, isLoading} = useGetCartQuery()

  if (isLoading) {
    return <CircularProgress/>
  }

  return (
    <div>{data?.total}</div>
  )
}