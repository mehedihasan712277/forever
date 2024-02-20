import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auxiliary/AuthProvider'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import axios from 'axios'
import UpdateAddress from './UpdateAddress'

const Profile = () => {
    const { user, cart, y } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/userAddress/${user.uid}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [y])
    let divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymenshing"];

    return (
        <>
            <div className='flex flex-col items-center py-12 min-h-[60vh]'>
                <div className='w-[310px] mx-auto'>
                    <p className='font-bold'>Name : {user.displayName}</p>
                    <p className='font-bold'>Email : {user.email}</p>
                </div>

                <div>
                    {
                        loading
                            ?
                            <p className='h-44 w-[310px] flex items-center'>Loading...</p>
                            :
                            Boolean(data) ?
                                <div className='w-[310px]'>
                                    <p className='font-bold'>Address:</p>
                                    <p>{data.house}</p>
                                    <p>{data.policeStation}</p>
                                    <p>
                                        {
                                            `${data.district.slice(1)},${divisions[Number(data.division) - 1]}`
                                        }
                                    </p>
                                    <p>{data.phone}</p>
                                    {/* --------------------------------------------- */}
                                    <div className="drawer">
                                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content">
                                            {/* Page content here */}
                                            <label htmlFor="my-drawer" className="btn btn-outline btn-sm rounded-sm drawer-button">Edit address</label>
                                        </div>
                                        <div className="drawer-side">
                                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                                {/* Sidebar content here */}
                                                <UpdateAddress></UpdateAddress>

                                            </ul>
                                        </div>
                                    </div>
                                    {/* --------------------------------------------- */}
                                </div>
                                :
                                <>
                                    <div className="drawer z-[5000]">
                                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content w-[310px] py-6">
                                            <p>Add address for fast order</p>
                                            <label htmlFor="my-drawer" className="btn btn-outline rounded-sm drawer-button">Add address</label>
                                        </div>
                                        <div className="drawer-side">
                                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                            <ul className="menu p-4 w-72 mm:w-80 md:w-96 min-h-full bg-base-200 text-base-content">
                                                {/* Sidebar content here */}
                                                {/* <li><a>Sidebar Item 1</a></li>
                                            <li><a>Sidebar Item 2</a></li> */}
                                                <EditProfile></EditProfile>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                    }
                </div>
                {
                    Boolean(cart.length) &&
                    <div className='w-[310px] flex justify-between items-center bg-gray-200 p-2 rounded-sm'>
                        <p>{cart.length} product{cart.length > 1 ? "s are" : " is"} added to cart</p>
                        <Link to="/mycart">
                            <button className='btn btn-outline btn-neutral btn-sm rounded-sm'>Check out</button>
                        </Link>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile