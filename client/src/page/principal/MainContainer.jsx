import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

const MainContainer = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default MainContainer