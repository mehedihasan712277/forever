import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import Price from './Price';
import { AuthContext } from '../../auxiliary/AuthProvider';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { user, changeX } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0)
    const [selectedItemInfo, setSelectedItemInfo] = useState([]);
    const location = useLocation()
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/cart?uid=${user?.uid}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [refresh])
    if (loading) {
        return <div className='w-full flex justify-center py-60'>
            <span className="loading loading-infinity loading-lg bg-blue-600"></span>
        </div>
    }
    // handling delete cart---------------------------------------
    const handleDeleteCart = (id) => {
        axios.delete(`https://server-forever.vercel.app/cart/${id}`)
            .then(res => {
                Swal.fire({
                    title: "Removed",
                    text: "Product removed successfully",
                    icon: "success"
                });
                setRefresh(!refresh);
                changeX();
            })
    }
    // handling multiple item selection-------------------------------
    const handlSelectedItem = (event, id) => {
        let selectedData = data.filter(ele => ele._id === id);
        if (event.target.checked) {
            // setI(true);
            selectedData[0].isSelected = event.target.checked;
        }
        else {
            // setI(false);
            selectedData[0].isSelected = event.target.checked;
        }
        let selectedProduct = data.filter(ele => ele.isSelected);
        setSelectedItemInfo(selectedProduct);
        // count total-------------------
        let sum1 = 0;
        selectedProduct.map(ele => {
            sum1 += ele.reducedPrice;
        })
        setPrice(sum1);
    }
    return (
        <>
            <div className='relative'>
                {
                    selectedItemInfo.length ?
                        <div className='fixed w-full bottom-0 py-3 left-0 bg-white flex justify-around items-center'>
                            <Price selectedItemInfo={selectedItemInfo}></Price>
                            <Link to="/address" state={{ info: selectedItemInfo, price: price }} className='w-[120px] btn btn-error'>Order ({selectedItemInfo.length})</Link>
                        </div>
                        :
                        ""
                }
                {
                    data.length ?
                        <>
                            <p className='text-center text-xl font-bold border-b-2 pb-4 text-gray-600 w-4/5 mx-auto pt-4'>Select product to order</p>
                            <div className='flex flex-col gap-6 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-12'>
                                {
                                    data.map(ele => {
                                        return <div key={ele._id} className='bg-blue-100 p-2 ml:p-3 xl:p-4 rounded-md'>
                                            <div className='mv:flex mv:justify-between'>
                                                {/* ------info------------------ */}
                                                <div className='flex gap-1 items-center'>
                                                    {/* -----checkbox----------- */}
                                                    <input type="checkbox" onChange={(event) => handlSelectedItem(event, ele._id)} className="mr-2 checkbox checkbox-info border-2 bg-gray-300" />
                                                    {/* ------image----- */}
                                                    <div className=''>
                                                        <img src={ele.img1} alt="img" className='h-20 mv:h-36 w-20 mv:w-36 rounded-md' />
                                                    </div>
                                                    {/* --------info-------- */}
                                                    <div className='md:pl-4'>
                                                        <p className='text-xs mv:text-sm md:text-lg font-bold'>{ele.productName}</p>
                                                        <div className='flex flex-wrap gap-1 md:gap-2 xl:gap-1 text-sm md:text-lg'>
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
                                                </div>

                                                {/* ------------buttons-------------- */}
                                                <div className='pt-2 mv:pt-0 pl-9 mv:pl-0 flex mv:flex-col justify-between gap-1 mv:items-end'>
                                                    {/* <Link to="/address" state={{ info: [{ productId: ele._id, productName: ele.productName, description: ele.description, img1: ele.img1, img2: ele.img2, img3: ele.img3, img4: ele.img4, regularPrice: ele.regularPrice, reducedPrice: ele.reducedPrice }] }}>
                                                        <button className='btn btn-neutral btn-outline btn-sm w-full'>Buy</button>
                                                    </Link> */}
                                                    <Link to={`/products/item`} state={{ path: location.pathname, productId: ele._id, productName: ele.productName, description: ele.description, img1: ele.img1, img2: ele.img2, img3: ele.img3, img4: ele.img4, regularPrice: ele.regularPrice, reducedPrice: ele.reducedPrice }} className=''>
                                                        <button className='btn btn-neutral btn-outline btn-sm rounded-sm'>
                                                            Details
                                                        </button>
                                                    </Link>
                                                    <button className='btn btn-neutral btn-outline btn-sm rounded-sm' onClick={() => handleDeleteCart(ele._id)}>Remove</button>
                                                </div>
                                                {/* <button className='btn btn-neutral' onClick={() => handleOrder(ele._id)}>select</button> */}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className='text-center font-bold py-60 text-lg'>
                            No product has been added yet
                        </div>
                }
            </div>
        </>
    )
}

export default MyCart