import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Details = () => {
    const location = useLocation()
    const [selectedImg, setSelectedImg] = useState(location.state.img1);
    return (
        <>
            <div className='select-none px-5 sm:px-12 md:px-20 lg:px-32 flex flex-col lg:flex-row gap-4 py-6 md:py-12 lg:py-20'>
                {/* --------------slider------------------ */}
                <div className='space-y-2 lg:flex-1'>
                    <div>
                        <img className='h-60 lg:h-72 w-full ml:w-80 lg:w-96 ring-2' src={selectedImg} alt="img" />
                    </div>
                    <div className='flex gap-2'>
                        <div className='cursor-pointer'>
                            <img className={`w-14 h-14 ${selectedImg === location.state.img1 ? 'ring-2' : ''}`} src={location.state.img1} alt="" onClick={() => setSelectedImg(location.state.img1)} />
                        </div>
                        <div className='cursor-pointer'>
                            <img className={`w-14 h-14 ${selectedImg === location.state.img2 ? 'ring-2' : ''}`} src={location.state.img2} alt="" onClick={() => setSelectedImg(location.state.img2)} />
                        </div>
                        <div className='cursor-pointer'>
                            <img className={`w-14 h-14 ${selectedImg === location.state.img3 ? 'ring-2' : ''}`} src={location.state.img3} alt="" onClick={() => setSelectedImg(location.state.img3)} />
                        </div>
                        <div className='cursor-pointer'>
                            <img className={`w-14 h-14 ${selectedImg === location.state.img4 ? 'ring-2' : ''}`} src={location.state.img4} alt="" onClick={() => setSelectedImg(location.state.img4)} />
                        </div>
                    </div>
                </div>
                {/* ---------------product info------------------ */}
                <div className='text-gray-700 lg:flex-1 lg:flex lg:flex-col lg:justify-between'>
                    <div>
                        <p className='text-xl font-bold'>{location.state.productName}</p>
                        <p>
                            <span className='font-semibold'>Price(tk) : </span>
                            <span className='mr-2'>{location.state.reducedPrice}</span>
                            <del>
                                <span className='text-red-400'>{location.state.regularPrice}</span>
                            </del>
                        </p>
                        <p className='py-4'>{location.state.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details