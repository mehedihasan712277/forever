import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi";

const Orders = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refresh, setrefresh] = useState(false)



    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/control_order`)
            .then(res => {
                setTotal(res.data.length);
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
                // setData(res.data);
                setLoading(false);
            })
    }, [refresh])
    if (loading) {
        return <div class="flex items-center justify-center min-h-[85vh] w-full">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>

    }


    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className='p-4'>
                {/* ----------------------title--------------------- */}
                <div className='flex items-center justify-between'>
                    <div className='flex gap-4 items-baseline'>
                        <p className='text-2xl font-bold text-gray-700'>Orders</p>
                        <p className='text-gray-500 text-sm font-semibold'>{data.length} order(s) for {total} product(s)</p>
                    </div>

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
                    Boolean(data.length) ?
                        <>
                            <div className='flex gap-4 mt-8'>
                                <p className={activeIndex === 0 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(0)}>All Orders</p>
                                <p className={activeIndex === 1 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(1)}>Confirmed</p>
                                <p className={activeIndex === 2 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(2)}>On the way</p>
                                <p className={activeIndex === 3 ? "text-cyan-400 font-bold p-1 border-b-2 border-cyan-400 transition duration-150" : "transition duration-150 cursor-pointer text-gray-500 font-bold p-1 border-b-2 border-transparent"} onClick={() => handleClick(3)}>Completed</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead className='border-b-2'>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Date</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            data.map((e, i) => {
                                                return e.map((ele, index) => {
                                                    return <tr key={ele._id} className={(i) % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                                                        <th>
                                                            {index + 1}
                                                        </th>
                                                        <td>NU0001</td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask w-12 h-12">
                                                                        <img src={ele.img1} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{ele.productName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span>{ele.address.house}</span>
                                                            <br />
                                                            <span>{ele.address.policeStation}{ele.address.district}{ele.address.division}</span>
                                                            <br />
                                                            <span className="">{ele.address.phone}</span>
                                                        </td>
                                                        <td>
                                                            {ele.address.date}
                                                            <br />
                                                            {ele.address.time}
                                                        </td>
                                                        <td>{ele.reducedPrice}</td>
                                                        <th>
                                                            {/* <button className="btn btn-outline btn-xs"> */}
                                                            {
                                                                e.length > 1
                                                                    ?
                                                                    !Boolean(index)
                                                                        ?
                                                                        <>
                                                                            <div>{ele.status === "placed" && <button className="btn btn-outline btn-xs">Confirm</button>}</div>
                                                                            <div>{ele.status === "confirmed" && <button className="btn btn-outline btn-xs">Send</button>}</div>
                                                                            <div>{ele.status === "processing" && <button className="btn btn-outline btn-xs">Completed</button>}</div>
                                                                        </>
                                                                        :
                                                                        ""
                                                                    :
                                                                    <>
                                                                        <div>{ele.status === "placed" && <button className="btn btn-outline btn-xs">Confirm</button>}</div>
                                                                        <div>{ele.status === "confirmed" && <button className="btn btn-outline btn-xs">Send</button>}</div>
                                                                        <div>{ele.status === "processing" && <button className="btn btn-outline btn-xs">Completed</button>}</div>
                                                                    </>
                                                            }
                                                            {/* </button> */}
                                                        </th>
                                                    </tr>
                                                })
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <p className='font-bold mt-52 text-center'>No order</p>
                }
            </div>
        </>
    );
};

export default Orders;
