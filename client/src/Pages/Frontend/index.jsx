import React from 'react'
import Header from '../../components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from '../../components/Footer'
import Home from './Home'
import Products from './Allproducts'
import LimeLight from './LimeLight'
import MensWear from './MensWear'
import CartPage from './CartPage'
import DailyWear from './DailyWear'
import Child from './Child'
import Success from './Success'
import Cancel from './Cancel'


const Frontend = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='lime' element={<LimeLight />} />
          <Route path='mens' element={<MensWear />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='daily' element={<DailyWear />} />
          <Route path='child' element={<Child />} />
          <Route path='success' element={<Success />} />
          <Route path='cancel' element={<Cancel />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default Frontend