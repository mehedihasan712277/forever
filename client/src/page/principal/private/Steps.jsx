import React from 'react'
import { BsCartCheck, BsCheck2All, BsHouse, BsTruck } from "react-icons/bs";

const Steps = ({ status }) => {
    return (
        <>
            <div className='sm:text-2xl md:text-3xl flex justify-between items-center'>
                {/* -------------------------------------------------first step------------------------------------------- */}
                <div className='w-full h-1 md:h-2 bg-green-600'></div>
                <div className='bg-green-600 text-white p-2 md:p-4 rounded-full relative'>
                    <BsCartCheck />
                </div>
                <div className='w-full h-1 md:h-2 bg-green-600'></div>

                {/* -----------------------------------------------second step-------------------------------------------- */}
                <div className={`w-full h-1 md:h-2 ${((status === "confirmed") || (status === "processing") || (status === "delivered")) ? "bg-green-600" : "bg-white"}`}></div>
                <div className={`${((status === "confirmed") || (status === "processing") || (status === "delivered")) ? "bg-green-600 text-white" : "bg-white"} p-2 md:p-4 rounded-full relative`}>
                    <BsCheck2All />
                </div>
                <div className={`w-full h-1 md:h-2 ${((status === "confirmed") || (status === "processing") || (status === "delivered")) ? "bg-green-600" : "bg-white"}`}></div>

                {/* -------------------------------------------------third step------------------------------------------- */}
                <div className={`w-full h-1 md:h-2 ${((status === "processing") || (status === "delivered")) ? "bg-green-600" : "bg-white"}`}></div>
                <div className={`${((status === "processing") || (status === "delivered")) ? "bg-green-600 text-white" : "bg-white"} p-2 md:p-4 rounded-full relative`}>
                    <BsTruck />
                </div>
                <div className={`w-full h-1 md:h-2 ${((status === "processing") || (status === "delivered")) ? "bg-green-600" : "bg-white"}`}></div>

                {/* ------------------------------------------------fourth step------------------------------------------- */}
                <div className={`w-full h-1 md:h-2 ${(status === "delivered") ? "bg-green-600" : "bg-white"}`}></div>
                <div className={`p-2 md:p-4 rounded-full relative ${(status === "delivered") ? "bg-green-600 text-white" : "bg-white"}`}>
                    <BsHouse />
                </div>
                <div className={`w-full h-1 md:h-2 ${(status === "delivered") ? "bg-green-600" : "bg-white"}`}></div>
            </div>

            <div className='grid grid-cols-4'>
                <div className='text-[10px] ml:text-xs md:text-sm text-center'>
                    <p>Order</p>
                    <p>Placed</p>
                </div>
                <div className='text-[10px] ml:text-xs md:text-sm text-center'>
                    <p>Order</p>
                    <p>Confirmed</p>
                </div>
                <div className='text-[10px] ml:text-xs md:text-sm text-center'>
                    <p>On the</p>
                    <p>Way</p>
                </div>
                <div className='text-[10px] ml:text-xs md:text-sm text-center'>
                    <p>Product</p>
                    <p>Delivered</p>
                </div>
            </div>
        </>
    )
}

export default Steps