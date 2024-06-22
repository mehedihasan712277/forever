import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const Blog = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/blog/${location.state.id}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [])
    if (loading) {
        return <div className="flex items-center justify-center min-h-[85vh] w-full">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>
    }
    return (
        <>
            <div className='py-6'>
                <div className='sm:w-[500px] w-full mx-auto px-2 sm:px-0'>
                    <p className='text-xs text-gray-600'>Posted on {data.time}, {data.date}</p>
                    {
                        data.info.map((e, index) => {
                            return <div key={index} className={e.type === "text" && "py-2"}>
                                {
                                    e.type === "title" && <p className='font-bold py-2 text-xl'>{e.value}</p>
                                }
                                {
                                    e.type === "banner" && <img className='sm:w-[500px] w-full sm:h-64 h-44' src={e.value} alt="banner" />
                                }
                                {
                                    e.type === "subtitle" && <p className='pb-3'>{e.value}</p>
                                }
                                {
                                    e.type === "text" && <p className='text-justify'>{e.value}</p>
                                }
                                {
                                    e.type === "image" && <div className='w-[300px] h-[150px] mx-auto'><img className='w-[300px] h-[150px]' src={e.value} alt="image" /></div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Blog