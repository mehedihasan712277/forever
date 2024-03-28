import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsBackspaceReverseFill, BsFillCartXFill, BsPencilSquare } from "react-icons/bs";
import { FiRefreshCw } from 'react-icons/fi';

const Carts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setrefresh] = useState(false);

    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/all_cart`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [refresh])
    if (loading) {
        return <div className="flex items-center justify-center min-h-[85vh] w-full">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>
    }
    return (
        <>
            <div className='text-[#374259]'>
                <div className='w-full flex justify-end p-6'>
                    <button className='btn bg-cyan-400 text-white hover:text-black btn-sm rounded-sm'
                        onClick={() => {
                            setrefresh(!refresh);
                            setLoading(true);
                        }}
                    >
                        <FiRefreshCw />
                        Refresh
                    </button>
                </div>
                {
                    data.length ?
                        <div className='flex flex-wrap gap-2 ml:gap-4 justify-center py-6'>
                            {
                                data.map(ele => {
                                    return <div key={ele._id} className='bg-[#D2E9E9] p-2 ml:p-3 xl:p-4 rounded-md'>
                                        <div className='-32 mm:w-40 lg:w-44 xl:w-48 h-full flex flex-col justify-between'>
                                            <Link to={`/details/${ele._id}`} state={
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
                                                <div>
                                                    <div className='h-36 lg:h-40 xl:h-52 bg-white rounded-md'>
                                                        <img src={ele.img1} alt="img" className='h-36 lg:h-40 xl:h-52 w-full rounded-md' />
                                                    </div>
                                                    <p className='text-xs md:text-sm lg:text-lg font-bold'>{ele.productName}</p>
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
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        :
                        <div className='font-bold pt-52 flex flex-col items-center'>
                            <p className='text-7xl text-cyan-400'>
                                <BsFillCartXFill />
                            </p>
                            <p className='text-xl'>No product in cart</p>
                        </div>
                }
            </div>
        </>
    )
}

export default Carts