import React from 'react'
import Header from '../components/Header'
import Main from '../pages/Main'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>

    </>
    )
}

export default Layout