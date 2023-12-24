import React from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'store'



export default function RequireAuth() {
    const { isUser } = useAppSelector((state) => state.user)
    const location = useLocation()
  return (
    isUser 
    ? <Outlet/>
    : <Navigate to="/signin" />
  )
}