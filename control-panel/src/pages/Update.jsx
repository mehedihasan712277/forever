import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAUpdateProduct = (event) => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const productName = form.productName.value;
        const regularPrice = Number(form.regularPrice.value);
        const reducedPrice = Number(form.reducedPrice.value);
        const img1 = form.img1.value;
        const img2 = form.img2.value;
        const img3 = form.img3.value;
        const img4 = form.img4.value;
        const description = form.description.value;
        const sold = Number(form.sold.value);
        const category = form.category.value;

        const info = {
            productName,
            regularPrice,
            reducedPrice,
            img1,
            img2,
            img3,
            img4,
            description,
            sold,
            category
        }
        axios.put(`https://server-forever.vercel.app/control/${location.state.id}`, info)
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: "Product Updated successfully",
                    icon: "success"
                });
                setLoading(false);
                navigate("/allproducts")
            })
        // console.log(info);
    }
    if (loading) {
        return <div className='fixed top-0 left-0 w-full h-screen z-20 text-center' style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' }}>
            <div className='flex items-center justify-center h-full'>
                <div class="px-4 py-2 text-sm font-medium leading-none text-center text-white bg-cyan-500 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Updating...</div>
            </div>
        </div>
    }
    return (
        <>
            <section>
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <p className="mb-4 text-2xl text-center font-bold text-cyan-400">Add product</p>
                    <form onSubmit={handleAUpdateProduct}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                <input defaultValue={location.state.productName} type="text" name="productName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required />
                            </div>
                            {/* -----------images-------------- */}
                            <div className="w-full">
                                <label htmlFor="img1" className="block mb-2 text-sm font-medium text-gray-900">Image 1</label>
                                <input defaultValue={location.state.img1} type="text" name="img1" id="img1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="img2" className="block mb-2 text-sm font-medium text-gray-900">Image 2</label>
                                <input defaultValue={location.state.img2} type="text" name="img2" id="img2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="img3" className="block mb-2 text-sm font-medium text-gray-900">Image 3</label>
                                <input defaultValue={location.state.img3} type="text" name="img3" id="img3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="img4" className="block mb-2 text-sm font-medium text-gray-900">Image 4</label>
                                <input defaultValue={location.state.img4} type="text" name="img4" id="img4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                            </div>
                            {/* -------------------------------------- */}
                            <div className="w-full">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Regular Price</label>
                                <input defaultValue={location.state.regularPrice} type="number" name="regularPrice" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="120" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Reduced Price</label>
                                <input defaultValue={location.state.reducedPrice} type="number" name="reducedPrice" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="100" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <select defaultValue={location.state.category} id="category" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option value="nutrition">nutrition</option>
                                    <option value="bee">bee</option>
                                    <option value="weight">weight</option>
                                    <option value="skin">skin</option>
                                    <option value="household">household</option>
                                    <option value="personal">personal</option>
                                    <option value="drinks">drinks</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900">Sold</label>
                                <input defaultValue={location.state.sold} type="number" name="sold" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ex. 12" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea defaultValue={location.state.description} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Write a product description here..."></textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="text-cyan-500 inline-flex items-center hover:text-white border border-cyan-500 hover:bg-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Update