import React, { useState } from 'react';

const Orders = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className='p-4'>
                {/* ----------------------title--------------------- */}
                <div className='flex gap-4 items-baseline'>
                    <p className='text-2xl font-bold text-gray-700'>Orders</p>
                    <p className='text-gray-500 text-sm font-semibold'>15 orders found</p>
                </div>
                {/* -------------------category name-------------------- */}
                <div className='flex gap-4 mt-8'>
                    <p className={activeIndex === 0 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(0)}>All Orders</p>
                    <p className={activeIndex === 1 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(1)}>Confirmed</p>
                    <p className={activeIndex === 2 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(2)}>On the way</p>
                    <p className={activeIndex === 3 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(3)}>Completed</p>
                </div>
            </div>
        </>
    );
};

export default Orders;
