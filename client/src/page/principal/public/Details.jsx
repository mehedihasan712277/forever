import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShop, FaCartShopping } from "react-icons/fa6";
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auxiliary/AuthProvider';

const Details = () => {
    const { user, changeX } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const [selectedImg, setSelectedImg] = useState(location.state.img1);
    const addtoCart = (info) => {
        if (user) {
            const addedProductInfo = {
                ...info,
                userId: user.uid,
                userName: user.displayName,
            }
            console.log(addedProductInfo);
            axios.post(`https://server-forever.vercel.app/products`, addedProductInfo)
                .then(res => {
                    Swal.fire({
                        title: "Success",
                        text: "Added to cart successfully",
                        icon: "success"
                    });
                    changeX();
                    navigate("/mycart")
                })
        }
        else {
            navigate("/signin")
        }
    }

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
                    {/* -----------------button------------------- */}
                    {
                        !location.state.path &&
                        <div className='w-full flex justify-between'>
                            <Link to="/address" state={{ info: [{ productId: location.state._id, productName: location.state.productName, description: location.state.description, img1: location.state.img1, img2: location.state.img2, img3: location.state.img3, img4: location.state.img4, regularPrice: location.state.regularPrice, reducedPrice: location.state.reducedPrice }], price: location.state.reducedPrice }}>
                                <button className='btn btn-outline rounded-sm'>
                                    <FaShop />
                                    Buy now
                                </button>
                            </Link>
                            <button className='btn btn-outline rounded-sm'
                                onClick={() => {
                                    addtoCart({ productId: location.state._id, productName: location.state.productName, description: location.state.description, img1: location.state.img1, img2: location.state.img2, img3: location.state.img3, img4: location.state.img4, regularPrice: location.state.regularPrice, reducedPrice: location.state.reducedPrice, price: location.state.reducedPrice })
                                }}
                            >
                                <FaCartShopping />
                                Add to cart
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Details;
