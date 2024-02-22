import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsBackspaceReverseFill, BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';

const AllProducts = () => {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/products`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [refresh])

    if (loading) {
        return <div class="flex items-center justify-center min-h-[85vh] w-full">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>
    }



    const handleDeleteProduct = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://server-forever.vercel.app/control/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been deleted",
                            icon: "success"
                        });
                        setLoading(true)
                        setRefresh(!refresh);
                    });
            }
        });
    }
    return (
        <>
            <div className='text-[#374259]'>
                {
                    data.length ?
                        <div className='flex flex-wrap gap-2 ml:gap-4 justify-center py-6'>
                            {
                                data.map(ele => {
                                    return <div key={ele._id} className='bg-[#D2E9E9] p-2 ml:p-3 xl:p-4 rounded-md'>
                                        <div className='w-32 mm:w-40 lg:w-44 xl:w-48 h-full flex flex-col justify-between'>
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
                                                <p>Sold: {ele.sold}</p>
                                            </div>

                                            <div className='flex justify-between gap-1'>
                                                <button onClick={() => handleDeleteProduct(ele._id)} className=' btn btn-sm text-[#374259] bg-transparent border-none shadow-none'><BsBackspaceReverseFill className='text-xl' /></button>
                                                <Link to={`/update/${ele._id}`} state={{
                                                    productName: ele.productName,
                                                    regularPrice: ele.regularPrice,
                                                    reducedPrice: ele.reducedPrice,
                                                    img1: ele.img1,
                                                    img2: ele.img2,
                                                    img3: ele.img3,
                                                    img4: ele.img4,
                                                    description: ele.description,
                                                    sold: ele.sold,
                                                    category: ele.category,
                                                    id: ele._id
                                                }}>
                                                    <button className=' btn btn-sm text-[#374259] bg-transparent border-none shadow-none'><BsPencilSquare className='text-xl' /></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        :
                        <div className='py-40 font-bold text-gray-700 text-center'>
                            No product
                        </div>
                }
            </div>
        </>
    )
}

export default AllProducts