import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
    return (
        <div className='select-none'>
            <Sidebar></Sidebar>
            <div className='ml-64 mt-[15vh] bg-gray-100 min-h-[85vh] rounded-tl-md'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default MainContainer