import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auxiliary/AuthProvider';
import Invoice from './Invoice';
import Steps from './Steps';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/order?uid=${user.uid}`)
            .then(res => {
                const groupedObjects = {};
                res.data.forEach(obj => {
                    if (groupedObjects[obj.tuid]) {
                        groupedObjects[obj.tuid].push(obj);
                    } else {
                        groupedObjects[obj.tuid] = [obj];
                    }
                });
                const x = Object.values(groupedObjects);
                setData(x)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className='w-full flex justify-center py-60'>
            <span className="loading loading-infinity loading-lg bg-blue-600"></span>
        </div>
    }

    return (
        <>
            {
                data.length > 0 ?
                    <div className='px-2 sm:px-8 md:px-12 lg:px-20 xl:px-32'>
                        {
                            data.map((ele, index) => {
                                // --------------------groups------------------------
                                return <div key={index} className='bg-gray-200 my-6 rounded-md'>
                                    {/* ------------items in a group----------- */}
                                    <div className='space-y-2 p-2 relative'>
                                        <div className='flex justify-between items-end'>
                                            <p className='text-blue-900'>Total: {ele[0].totalPrice}Tk</p>
                                            <div>
                                                <p className=' text-blue-900'>Ordered on: {ele[0].address.date}</p>
                                                <p className=' text-blue-900 text-end'>{ele[0].address.time}</p>
                                            </div>
                                        </div>
                                        {
                                            ele.map(e => {
                                                return <div key={e._id}>
                                                    <div className='flex gap-2'>
                                                        {/* -----------image----------- */}
                                                        <div className='bg-white'>
                                                            <img src={e.img1} alt='img' className='h-20 w-20' />
                                                        </div>
                                                        {/* ------------info-------------- */}
                                                        <div className='text-blue-900'>
                                                            <p className='font-semibold'>{e.productName}</p>
                                                            <p className=''>{e.reducedPrice} Tk</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        {/* <div className='flex justify-end'>
                                </div> */}
                                        <div className='pb-12'>
                                            <Steps status={ele[0].status}></Steps>
                                        </div>
                                        <Invoice tuid={ele[0].tuid}></Invoice>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div className='text-center font-bold py-60 text-lg'>
                        No product has been ordered yet
                    </div>
            }

        </>
    )
}

export default Orders