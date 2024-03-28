import React, { useState } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
const Post = () => {
    const [fields, setFields] = useState([]);
    const [x, setX] = useState(0);

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

    const handleImageDisplay = (index, url) => {
        const imgContainer = document.getElementById(`image-${index}`);
        if (imgContainer) {
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.style.maxWidth = '700px';
                img.style.maxHeight = '700px';
                img.alt = 'Dynamic Image';
                img.style.display = 'block';
                img.style.marginTop = '10px';

                // Remove any existing image
                imgContainer.innerHTML = '';
                imgContainer.appendChild(img);
            } else {
                // If no URL is provided, clear the container
                imgContainer.innerHTML = '';
            }
        }
    };

    const handleFieldDelete = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
        handleImageDisplay(index, null);
    };

    const handleSubmit = () => {
        const fieldValues = fields.map((field) => field.value);
        console.log('Form data:', fieldValues);
    };

    const renderField = (field, index) => {
        switch (field.type) {
            case 'text':
                return (
                    <div key={index} className="flex mt-2 bg-white">
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
            case 'image':
                return (
                    <div key={index} className="flex mt-2 items-center bg-white">
                        <input
                            type="text"
                            name="imageField"
                            placeholder="Enter image link here"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e)}
                            className='w-96 rounded-sm p-2'
                        />
                        <button
                            onClick={() => {
                                handleFieldDelete(index);
                                setX(x - 1);
                            }}
                            className='btn btn-sm bg-transparent outline-none border-none shadow-none text-gray-700 hover:text-black rounded-sm text-xl'
                        >
                            <FaDeleteLeft />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='pb-32 mx-auto w-fit'>
            <h2>Dynamic Input Form with Deletion of Corresponding Image</h2>
            <div id="dynamicFields">
                {fields.map(renderField)}
            </div>
            <div className='fixed bottom-0 right-0 left-64 w-full'>
                <div className="flex gap-4 py-6 pl-12 bg-red-100">
                    <button type="button" onClick={addTextField} className='btn btn-outline btn-sm rounded-sm'>
                        Add Text Field
                    </button>
                    <button type="button" onClick={() => {
                        addImageField();
                        setX(x + 1);
                    }}
                        className='btn btn-outline btn-sm rounded-sm'>
                        Add Image Link Field
                    </button>
                    <button type="button" onClick={handleSubmit} className='btn btn-outline btn-sm rounded-sm'>
                        Submit
                    </button>
                    {
                        x > 1 && <button className='btn btn-outline btn-sm rounded-sm'>button</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Post;

