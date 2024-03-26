import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Banner = () => {
    const [inputs, setInputs] = useState([""]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/banner`)
            .then(res => {
                setInputs(res.data[0].links);
                setLoading(false);
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.length < 2) {
            Swal.fire({
                title: "Error",
                text: "Enter at least two link",
                icon: "error",
            })
        }
        else {
            const links = {
                name: "link",
                links: inputs
            }
            setLoading1(true);
            axios.put(`https://server-forever.vercel.app/banner`, links)
                .then(res => {
                    setLoading1(false);
                })
        }
        // console.log(inputs.filter(input => input !== '')); // Filter out empty strings if needed
    };

    const handleInputChange = (index, event) => {
        const values = [...inputs];
        values[index] = event.target.value;
        setInputs(values);
    };

    const handleAddMore = () => {
        setInputs([...inputs, '']);
    };

    const handleDelete = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[85vh] w-full">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>
    }

    return (
        <>
            {
                loading1 &&
                <div className='fixed top-0 left-0 w-full h-screen z-20 text-center' style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}>
                    {/* <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-cyan-500 loading loading-infinity loading-lg"></span> */}
                    <div className='text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                        <span>Uploading</span>
                        <span className="loading loading-dots loading-xs -mb-2"></span>
                    </div>
                </div>
            }
            <div className='py-12'>
                <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto rounded-md px-4 py-12 bg-white">
                    {inputs.map((input, index) => (
                        <div key={index} className="relative z-0 w-full mb-5 group">
                            <input
                                id={`${index}`}
                                type="text"
                                value={input}
                                onChange={(e) => handleInputChange(index, e)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label htmlFor={`${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image link {`${index + 1}`}</label>
                            <button type="button" onClick={() => handleDelete(index)} className='btn btn-xs rounded-full btn-error px-3 mt-2'>
                                Delete
                            </button>
                        </div>
                    ))}
                    <div className='flex justify-center gap-4'>
                        <button type="button" onClick={handleAddMore} className='btn bg-cyan-400 text-gray-700 hover:text-black btn-sm rounded-sm'>
                            Add More
                        </button>
                        <button type="submit" className='btn bg-cyan-400 text-gray-700 hover:text-black btn-sm rounded-sm'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Banner;
