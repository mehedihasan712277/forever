import React, { useState } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaRegFileImage, FaUpload } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { RiCollageFill } from "react-icons/ri";
import { MdTitle } from "react-icons/md";
import { PiFlagBannerFill } from "react-icons/pi";

const Post = () => {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const addTitleField = () => {
        setFields([...fields, { type: 'title', value: '' }]);
    };

    const addBannerField = () => {
        setFields([...fields, { type: 'banner', value: '' }]);
    };

    const addTextField = () => {
        setFields([...fields, { type: 'text', value: '' }]);
    };

    const addImageField = () => {
        setFields([...fields, { type: 'image', value: '' }]);
    };

    const handleInputChange = (index, event) => {
        const updatedFields = [...fields];
        updatedFields[index].value = event.target.value;
        setFields(updatedFields);
    };

    const handleFieldDelete = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleSubmit = () => {
        // const fieldValues = fields.map((field) => field.value);
        // console.log('Form data:', fieldValues);

        // Get the current date and time
        const currentDate = new Date();

        // Format the date (day-month-year)
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        // Format the time (12-hour AM/PM)
        const hours = currentDate.getHours() % 12 || 12; // Get 12-hour format
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${amPm}`;


        const blogData = {
            time: formattedTime,
            date: formattedDate,
            info: fields
        }
        console.log(blogData);
        setLoading(true);
        axios.post(`https://server-forever.vercel.app/blog`, blogData)
            .then(() => {
                setLoading(false);
                Swal.fire({
                    title: "Sucess",
                    text: "Posted successfully",
                    icon: "success"
                });
                setFields([]);
            })
            .catch(err => {
                setLoading(false);
                Swal.fire({
                    title: "Opps",
                    text: `${err.message}`,
                    icon: "error"
                });
            })
    };

    const renderField = (field, index) => {
        switch (field.type) {
            case 'title':
                return (
                    <div key={index} className="flex mt-2 bg-transparent">
                        <textarea
                            type="text"
                            name="textField"
                            placeholder="Enter some text here"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e)}
                            className='w-96 h-12 rounded-sm p-2'
                        />
                        <button onClick={() => handleFieldDelete(index)} className='btn btn-sm bg-transparent outline-none border-none shadow-none text-gray-700 hover:text-black rounded-sm text-xl'>
                            <FaDeleteLeft />
                        </button>
                    </div>
                );
            case 'text':
                return (
                    <div key={index} className="flex mt-2 bg-transparent">
                        <textarea
                            type="text"
                            name="textField"
                            placeholder="Enter some text here"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e)}
                            className='w-96 h-52 rounded-sm p-2'
                        />
                        <button onClick={() => handleFieldDelete(index)} className='btn btn-sm bg-transparent outline-none border-none shadow-none text-gray-700 hover:text-black rounded-sm text-xl'>
                            <FaDeleteLeft />
                        </button>
                    </div>
                );
            case 'banner':
                return (
                    <div key={index} className="flex mt-2 items-center bg-white">
                        <input
                            type="text"
                            name="imageField"
                            placeholder="Enter image link here"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-96 rounded-sm p-2"
                        />
                        <button
                            onClick={() => handleFieldDelete(index)}
                            className="btn btn-sm bg-transparent outline-none border-none shadow-none text-gray-700 hover:text-black rounded-sm text-xl"
                        >
                            <FaDeleteLeft />
                        </button>
                        {field.value && ( // Conditionally render the image if a URL is provided
                            <div id={`image-${index}`} className="mt-4">
                                <img
                                    src={field.value}
                                    alt="Dynamic Image"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                );
            case 'image':
                return (
                    <div key={index} className="flex mt-2 items-center bg-white">
                        <input
                            type="text"
                            name="imageField"
                            placeholder="Enter image link here"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-96 rounded-sm p-2"
                        />
                        <button
                            onClick={() => handleFieldDelete(index)}
                            className="btn btn-sm bg-transparent outline-none border-none shadow-none text-gray-700 hover:text-black rounded-sm text-xl"
                        >
                            <FaDeleteLeft />
                        </button>
                        {field.value && ( // Conditionally render the image if a URL is provided
                            <div id={`image-${index}`} className="mt-4">
                                <img
                                    src={field.value}
                                    alt="Dynamic Image"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return <>
        {
            loading &&
            <div className='fixed top-0 left-0 w-full h-screen z-20 text-center' style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}>
                {/* <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-cyan-500 loading loading-infinity loading-lg"></span> */}
                <div className='text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                    <span>Uploading</span>
                    <span className="loading loading-dots loading-xs -mb-2"></span>
                </div>
            </div>
        }
        <div className='pb-32 mx-auto w-fit'>
            <p className='font-bold py-6 text-cyan-500 text-xl text-center'>Dynamic Blog Post Form</p>
            <div id="dynamicFields">
                {fields.map(renderField)}
            </div>
            <div className='fixed top-24 right-0 left-64 w-44'>
                <div className="flex gap-4 py-6 pl-4 bg-transparent flex-col">
                    {/* --------------------------------title------------------------------------- */}
                    <button type="button" onClick={addTitleField} className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <MdTitle />
                    </button>
                    {/* --------------------------------banner------------------------------------- */}
                    <button type="button" onClick={() => {
                        addBannerField();
                    }}
                        className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <PiFlagBannerFill />
                    </button>
                    {/* --------------------------------Text------------------------------------- */}
                    <button type="button" onClick={addTextField} className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <IoText />
                    </button>
                    {/* --------------------------------Image------------------------------------- */}
                    <button type="button" onClick={() => {
                        addImageField();
                    }}
                        className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <FaRegFileImage />
                    </button>
                    {/* -----------------------------------submit---------------------------------- */}
                    <button type="button" onClick={handleSubmit} className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <FaUpload />
                    </button>
                    {/* --------------------------------collage------------------------------------ */}
                    <button className='btn bg-cyan-300 outline-none border-none text-lg btn-sm text-gray-600 font-bold rounded  w-fit'>
                        <RiCollageFill />
                    </button>
                </div>
            </div>
        </div>
    </>
};

export default Post;
