
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import {CartProvider} from './context/CartContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NavbarAdmin from './components/NavbarAdmin'
import AdminRoute from './components/AdminRoute'

import Home from './pages/user/Home'
import Fabrics from './pages/user/Fabrics'
import ReadyToWear from './pages/user/ReadyToWear'
import Tailoring from './pages/user/Tailoring'
import TailoringSuccess from './pages/user/TailoringSuccess'
import AdminTailoringRequests from './pages/admin/AdminTailoringRequests'
import Accessories from './pages/user/Accessories'
import About from './pages/user/about'
import Contact from './pages/user/Contact'
import ContactSuccess from './pages/user/ContactSuccess'
import Cart from './pages/user/Cart'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'  
import OrderSuccess from "./pages/user/OrderSuccess";


//admin import 
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMessages from './pages/admin/AdminMessages';


function App() {


  return (
  <AuthProvider>
    <CartProvider>
      <Navbar/>
      <NavbarAdmin/>
      <Routes>

        {/* User Routes */}
        <Route path="/" element = {<Home/>}/>
        <Route path="/fabrics" element = {<Fabrics/>}/>
        <Route path="/ready-to-wear" element = {<ReadyToWear/>}/>
        <Route path="/tailoring" element = {<Tailoring/>}/>
        <Route path="/tailoring-success" element={<TailoringSuccess />} />
        <Route path="/accessories" element = {<Accessories/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/contact-success" element = {<ContactSuccess/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/forgot-password" element = {<ForgotPassword/>}/>
        <Route path="/reset-password/:userId" element = {<ResetPassword/>}/>

        {/* Admin Routes */}  
        <Route path="/admin" element={<AdminRoute> <AdminDashboard/></AdminRoute>}/>
        <Route path="/admin/products" element={<AdminRoute> <AdminProducts/> </AdminRoute>}/>
        <Route path="/admin/products/new" element={<AdminRoute> <AdminProductForm/> </AdminRoute>}/>
        <Route path="/admin/products/:id/edit" element={<AdminRoute> <AdminProductForm/> </AdminRoute>}/>
        <Route path="/admin/users" element={<AdminRoute> <AdminUsers/> </AdminRoute>}/>
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute> <AdminOrders/> </AdminRoute>}/>
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/admin/tailoring-requests" element={<AdminRoute><AdminTailoringRequests /></AdminRoute>} />  

      </Routes>
      <Footer/>
    </CartProvider>
    </AuthProvider>
  
  )
}

export default App
