import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Blogs = () => {
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
      <div className='py-6 space-y-6'>
        {
          data.map(ele => {
            return <div key={ele._id} className='sm:w-[500px] w-full mx-auto px-2 sm:px-0'>
              <Link to={`/blog/${ele._id}`} state={{ id: ele._id }}>
                <p className='text-xs text-gray-600'>Posted on {ele.time}, {ele.date}</p>
                {
                  ele.info.map((e, index) => {
                    return <div key={`${ele._id, index}`} className={e.type === "text" && "py-2"}>
                      {
                        e.type === "title" && <p className='font-bold py-2 text-xl'>{e.value}</p>
                      }
                      {
                        e.type === "banner" && <img className='sm:w-[500px] w-full sm:h-64 h-44' src={e.value} alt="banner" />
                      }
                      {/* {
                        e.type === "text" && <p className='text-justify'>{e.value}</p>
                      } */}
                      {/* {
                      e.type === "image" && <div className='w-[300px] h-[150px] mx-auto'><img className='w-[300px] h-[150px]' src={e.value} alt="image" /></div>
                    } */}
                    </div>
                  })
                }
              </Link>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Blogs