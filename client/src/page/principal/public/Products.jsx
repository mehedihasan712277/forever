import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auxiliary/AuthProvider';
import Swal from 'sweetalert2';

const Products = () => {
    const { user, changeX } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [filtredData, setFiltredData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/products`)
            .then(res => {
                setData(res.data);
                setFiltredData(res.data);
            })
    }, [])
    if (!data) {
        return <div className='h-[80vh] w-full flex justify-center items-center'>
            <span className="loading loading-spinner text-accent"></span>
        </div>
    }
    // filter ----------------------------------
    const filter = (category) => {
        if (category === "all") {
            setFiltredData(data);
        }
        else {
            const info = data.filter(ele => ele.category === category)
            setFiltredData(info);
        }
    }
    // add to cart ------------------------------
    const addtoCart = (info) => {
        setLoading(true);
        if (user) {
            const addedProductInfo = {
                ...info,
                userId: user.uid,
                userName: user.displayName,
            }
            axios.post(`https://server-forever.vercel.app/products`, addedProductInfo)
                .then(res => {
                    Swal.fire({
                        title: "Success",
                        text: "Added to cart successfully",
                        icon: "success"
                    });
                    changeX();
                    setLoading(false);
                })
        }
        else {
            navigate("/signin")
        }
    }
    return (
        <>
            {
                loading &&
                <div className='fixed top-0 left-0 w-full h-screen z-20 text-center' style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}>
                    {/* <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-cyan-500 loading loading-infinity loading-lg"></span> */}
                    <div className='text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                        <span>Please Wait</span>
                        <span className="loading loading-dots loading-xs -mb-2"></span>
                    </div>
                </div>
            }
            <div className='bg-gray-50 mt-6 xl:mt-20'>
                <div className='pt-2 lg:pb-32 lg:pt-10 sm:px-4 md:px-16 xl:px-32'>
                    <div className='flex justify-center gap-2 py-2 md:py-6 px-1 flex-wrap sticky top-0 bg-gray-50'>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("all")}>All</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("skin")}>Skin</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("nutrition")}>Nutrition</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("bee")}>Bee Product</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("weight")}>Weight Management</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("household")}>Household</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("personal")}>Personal</button>
                        <button className='btn btn-outline btn-neutral btn-xs lg:btn-md' onClick={() => filter("drinks")}>Drinks</button>
                    </div>
                    <div className='flex flex-wrap gap-2 ml:gap-4 justify-center pb-6 pt-12'>
                        {
                            filtredData.length ?
                                filtredData.map(ele => {
                                    return <div key={ele._id} className='bg-white p-2 ml:p-3 xl:p-4 rounded-md shadow-md hover:shadow-xl transition duration-150'>
                                        <div className='w-28 ms:w-36 mm:w-40 lg:w-44 xl:w-48 h-full flex flex-col justify-between'>
                                            <Link to={`/products/item`} state={
                                                {
                                                    productId: ele._id,
                                                    productName: ele.productName,
                                                    description: ele.description,
                                                    img1: ele.img1,
                                                    img2: ele.img2,
                                                    img3: ele.img3,
                                                    img4: ele.img4,
                                                    regularPrice: ele.regularPrice,
                                                    reducedPrice: ele.reducedPrice
                                                }
                                            }>
                                                <div className='h-36 lg:h-40 xl:h-52 bg-white rounded-md'>
                                                    <img src={ele.img1} alt="img" className='h-36 lg:h-40 xl:h-52 w-full rounded-md' />
                                                </div>
                                                <p className='text-xs md:text-sm lg:text-lg font-bold pt-3'>{ele.productName}</p>
                                                <div className='flex flex-wrap gap-1 md:gap-2 xl:gap-1 text-xs xl:text-sm'>
                                                    <p>Price(Tk): {ele.reducedPrice}</p>
                                                    <del className='text-gray-500'>{ele.regularPrice}</del>
                                                    <p className='text-red-700'>
                                                        {
                                                            Number.parseInt(((ele.regularPrice - ele.reducedPrice) / ele.reducedPrice) * 100)
                                                        }
                                                        %off
                                                    </p>
                                                </div>
                                                <p>Sold: {ele.sold}</p>
                                            </Link>
                                            {/* ---------------------------Cart buttons-------------------------- */}

                                            <div className='flex flex-col gap-1 pt-2'>
                                                <button className='btn btn-neutral btn-sm btn-outline w-full'
                                                    onClick={() => {
                                                        addtoCart({
                                                            productId: ele._id,
                                                            productName: ele.productName,
                                                            description: ele.description,
                                                            img1: ele.img1,
                                                            img2: ele.img2,
                                                            img3: ele.img3,
                                                            img4: ele.img4,
                                                            regularPrice: ele.regularPrice,
                                                            reducedPrice: ele.reducedPrice,
                                                            price: ele.reducedPrice,
                                                            quantity: 1
                                                        })
                                                    }}
                                                >
                                                    Add to cart
                                                </button>
                                                {/* ----------------------buy now button------------------- */}
                                                <Link to="/address" state={
                                                    {
                                                        info: [
                                                            {
                                                                productId: ele._id,
                                                                productName: ele.productName,
                                                                description: ele.description,
                                                                img1: ele.img1,
                                                                img2: ele.img2,
                                                                img3: ele.img3,
                                                                img4: ele.img4,
                                                                regularPrice: ele.regularPrice,
                                                                reducedPrice: ele.reducedPrice,
                                                                quantity: 1
                                                            }
                                                        ],
                                                        price: ele.reducedPrice
                                                    }
                                                }>
                                                    <button className='btn btn-neutral btn-sm btn-outline w-full'>
                                                        Buy now
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                                :
                                <p className='text-center font-bold py-32'>
                                    No product to show
                                </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products