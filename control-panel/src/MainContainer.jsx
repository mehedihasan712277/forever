import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
    return (
        <div className='select-none'>
            <Sidebar></Sidebar>
            <div className='ml-64 mt-20 bg-gray-200 rounded-tl-md'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default MainContainer