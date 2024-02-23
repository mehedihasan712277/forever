import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi";
import { BsFillCartXFill } from "react-icons/bs";

const Orders = () => {
    const [activeIndex, setActiveIndex] = useState("all");
    const [data, setData] = useState([]);
    const [filtredData, setFiltredData] = useState(data);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refresh, setrefresh] = useState(false)


    // --------------------load order info-----------------------------------------
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
                setData(x);
                setFiltredData(x);
                setLoading(false);
                setActiveIndex("all");
            })
    }, [refresh])
    // -----------------------loader------------------------------------------------
    if (loading) {
        return <div className="flex items-center justify-center min-h-[85vh] w-full">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>

    }
    // -----------------------filter the order---------------------------------------
    const handleClick = (index) => {
        setActiveIndex(index);
        if (index === "all") {
            setFiltredData(data);
        }
        else {
            const filtredOrder = data.filter(ele => ele[0].status === index);
            setFiltredData(filtredOrder);
        }
    };
    // -----------------------update status------------------------------------------
    const handleStatus = (val, tuid) => {
        setLoading(true);
        const newStatus = { status: val }
        axios.put(`https://server-forever.vercel.app/control_status/${tuid}`, newStatus)
            .then(res => {
                setrefresh(!refresh);
                setLoading(false);
            })
    }
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
                                <p onClick={() => handleClick("all")}
                                    className={activeIndex === "all" ? "text-cyan-600 font-semibold p-1 border-b-2 border-cyan-600 transition ease-in-out delay-150" : "transition ease-in-out delay-150 cursor-pointer text-gray-500 font-semibold p-1 border-b-2 border-transparent"}>
                                    All Orders
                                    {activeIndex === "all" && ` (${filtredData.length})`}
                                </p>
                                <p onClick={() => handleClick("placed")}
                                    className={activeIndex === "placed" ? "text-cyan-600 font-semibold p-1 border-b-2 border-cyan-600 transition ease-in-out delay-150" : "transition ease-in-out delay-150 cursor-pointer text-gray-500 font-semibold p-1 border-b-2 border-transparent"}>
                                    Placed
                                    {activeIndex === "placed" && ` (${filtredData.length})`}
                                </p>
                                <p onClick={() => handleClick("confirmed")}
                                    className={activeIndex === "confirmed" ? "text-cyan-600 font-semibold p-1 border-b-2 border-cyan-600 transition ease-in-out delay-150" : "transition ease-in-out delay-150 cursor-pointer text-gray-500 font-semibold p-1 border-b-2 border-transparent"}>
                                    Confirmed
                                    {activeIndex === "confirmed" && ` (${filtredData.length})`}
                                </p>
                                <p onClick={() => handleClick("processing")}
                                    className={activeIndex === "processing" ? "text-cyan-600 font-semibold p-1 border-b-2 border-cyan-600 transition ease-in-out delay-150" : "transition ease-in-out delay-150 cursor-pointer text-gray-500 font-semibold p-1 border-b-2 border-transparent"}>
                                    On the way
                                    {activeIndex === "processing" && ` (${filtredData.length})`}
                                </p>
                                <p onClick={() => handleClick("delivered")}
                                    className={activeIndex === "delivered" ? "text-cyan-600 font-semibold p-1 border-b-2 border-cyan-600 transition ease-in-out delay-150" : "transition ease-in-out delay-150 cursor-pointer text-gray-500 font-semibold p-1 border-b-2 border-transparent"}>
                                    Completed
                                    {activeIndex === "delivered" && ` (${filtredData.length})`}
                                </p>
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
                                            filtredData.map((e, i) => {
                                                return e.map((ele, index) => {
                                                    return <tr key={ele._id} className={(i) % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                                                        <th>
                                                            {/* {index + 1} */}
                                                            {
                                                                e.length > 1
                                                                    ?
                                                                    index === 0
                                                                        ?
                                                                        `${i + 1}.`
                                                                        :
                                                                        ""
                                                                    :
                                                                    `${i + 1}.`
                                                            }
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
                                                            {
                                                                e.length > 1
                                                                    ?
                                                                    index === 0
                                                                        ?
                                                                        <>
                                                                            <div>{ele.status === "placed" && <button onClick={() => handleStatus("confirmed", ele.tuid)} className="btn border-yellow-300 bg-yellow-300 btn-sm rounded-full w-24">Confirm</button>}</div>
                                                                            <div>{ele.status === "confirmed" && <button onClick={() => handleStatus("processing", ele.tuid)} className="btn border-green-400 bg-green-400 btn-sm rounded-full w-24">Send</button>}</div>
                                                                            <div>{ele.status === "processing" && <button onClick={() => handleStatus("delivered", ele.tuid)} className="btn border-red-500 bg-red-500 btn-sm rounded-full w-24">Completed</button>}</div>
                                                                        </>
                                                                        :
                                                                        ""
                                                                    :
                                                                    <>
                                                                        <div>{ele.status === "placed" && <button onClick={() => handleStatus("confirmed", ele.tuid)} className="btn border-yellow-300 bg-yellow-300 btn-sm rounded-full w-24">Confirm</button>}</div>
                                                                        <div>{ele.status === "confirmed" && <button onClick={() => handleStatus("processing", ele.tuid)} className="btn border-green-400 bg-green-400 btn-sm rounded-full w-24">Send</button>}</div>
                                                                        <div>{ele.status === "processing" && <button onClick={() => handleStatus("delivered", ele.tuid)} className="btn border-red-500 bg-red-500 btn-sm rounded-full w-24">Completed</button>}</div>
                                                                    </>
                                                            }
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
                        <div className='font-bold mt-52 flex flex-col items-center'>
                            <p className='text-7xl text-cyan-400'>
                                <BsFillCartXFill />
                            </p>
                            <p className='text-xl'>No order to show</p>
                        </div>
                }
            </div>
        </>
    );
};

export default Orders;
