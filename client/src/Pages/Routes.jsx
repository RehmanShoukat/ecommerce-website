import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'
import { useAuthContext } from '../context/AuthContext'
import PrivateRoute from "../components/PrivateRoute"
import AdminRoute from '../components/AdminRoute'

const Index = () => {
  const {isAuth} = useAuthContext()
  return (
    <Routes>
        <Route path='/*' element={<Frontend/>}/>
        <Route path='auth/*' element={!isAuth ? <Auth/> : <Navigate to="/"/>}/>
        <Route path='/dashboard/*' element={<AdminRoute Component={Dashboard}/>}/>
    </Routes>
  )
}

export default Index