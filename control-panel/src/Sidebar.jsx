import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaCartArrowDown, FaImage, FaPlusCircle, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
    return (
        <>
            <div className=''>
                {/* horizontal --------------------*/}
                <div className='h-20 fixed top-0 bg-white w-full flex justify-between items-center px-32'>
                    <p>Forever BD Store</p>
                    <p>Sakib Akondo</p>
                </div>
                {/* vertical---------------------- */}
                <div className='fixed left-0 top-20  w-64 h-full'>
                    <NavLink to="/" className={({ isActive }) => isActive ? " text-cyan-500" : " text-gray-500"}>
                        <div className='flex items-center gap-2 hover:bg-cyan-100 hover:text-gray-800 px-6 p-2 font-bold m-2 rounded-full'>
                            <p><FaCartArrowDown /></p>
                            <p>Orders</p>
                        </div>
                    </NavLink>
                    <NavLink to="/allproducts" className={({ isActive }) => isActive ? " text-cyan-500" : " text-gray-500"}>
                        <div className='flex items-center gap-2 hover:bg-cyan-100 hover:text-gray-800 px-6 p-2 font-bold m-2 rounded-full'>
                            <p><FaShoppingBag /></p>
                            <p>All products</p>
                        </div>
                    </NavLink>
                    <NavLink to="/add" className={({ isActive }) => isActive ? " text-cyan-500" : " text-gray-500"}>
                        <div className='flex items-center gap-2 hover:bg-cyan-100 hover:text-gray-800 px-6 p-2 font-bold m-2 rounded-full'>
                            <p><FaPlusCircle /></p>
                            <p>Add new</p>
                        </div>
                    </NavLink>
                    <NavLink to="/carts" className={({ isActive }) => isActive ? " text-cyan-500" : " text-gray-500"}>
                        <div className='flex items-center gap-2 hover:bg-cyan-100 hover:text-gray-800 px-6 p-2 font-bold m-2 rounded-full'>
                            <p><FaShoppingCart /></p>
                            <p>Cart</p>
                        </div>
                    </NavLink>
                    <NavLink to="/banner" className={({ isActive }) => isActive ? " text-cyan-500" : " text-gray-500"}>
                        <div className='flex items-center gap-2 hover:bg-cyan-100 hover:text-gray-800 px-6 p-2 font-bold m-2 rounded-full'>
                            <p><FaImage /></p>
                            <p>Banner</p>
                        </div>
                    </NavLink>
                </div>
            </div></>
    )
}

export default Sidebar