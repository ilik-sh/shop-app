import RequireAuth from 'app/auth/requireAuth'
import SignInPage from 'app/auth/signIn.page'
import SignUpPage from 'app/auth/signUp.page'
import CartMainPage from 'app/cart /cartMain.page'
import ProductItemPage from 'app/products/productItem.page'
import ProductMainPage from 'app/products/productMain.page'
import UserMainPage from 'app/user/userMain.page'
import React from 'react'
import { Route, Routes } from 'react-router-dom'


export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<ProductMainPage/>}></Route>
      {/* =======Private======= */}
      <Route element={<RequireAuth/>}>
        <Route path='cart' element={<CartMainPage/>}></Route>
        <Route path='profile' element={<UserMainPage/>}></Route>
      </Route>
      {/* =======Public======= */}
      <Route path='products' element={<ProductMainPage/>}>
        <Route path='p' element={<ProductItemPage/>}></Route>
      </Route>
      <Route path='signin' element={<SignInPage/>}></Route>
      <Route path='signup' element={<SignUpPage/>}></Route>
      <Route path='*' element='ds'></Route>
    </Routes>
  )
}