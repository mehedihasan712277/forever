import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Blog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/blog`)
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
            <div className='py-6 space-y-20'>
                {
                    data.map(ele => {
                        return <div key={ele._id} className='sm:w-[500px] w-[300px] mx-auto'>
                            <p>Posted on {ele.time}, {ele.date}</p>
                            {
                                ele.info.map((e, index) => {
                                    return <div key={`${ele._id, index}`} className='py-2'>
                                        {
                                            e.type === "title" && <p className='font-bold text-xl'>{e.value}</p>
                                        }
                                        {
                                            e.type === "banner" && <img className='sm:w-[500px] w-[300px] sm:h-64 h-44' src={e.value} alt="banner" />
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
                    })
                }
            </div>
        </>
    )
}

export default Blog