import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';

const Add = () => {
    const handleAddProduct = (event) => {
        event.preventDefault();
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
        console.log(info);
        axios.post(`https://server-forever.vercel.app/control`, info)
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: "Product added successfully",
                    icon: "success"
                });
                form.reset();
            })
    }
    return (
        <>
            <div>
                <section>
                    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                        <p class="mb-4 text-2xl text-center font-bold text-cyan-400">Add product</p>
                        <form onSubmit={handleAddProduct}>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div class="sm:col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                    <input type="text" name="productName" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required />
                                </div>
                                {/* -----------images-------------- */}
                                <div class="w-full">
                                    <label for="img1" class="block mb-2 text-sm font-medium text-gray-900">Image 1</label>
                                    <input type="text" name="img1" id="img1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                                </div>
                                <div class="w-full">
                                    <label for="img2" class="block mb-2 text-sm font-medium text-gray-900">Image 2</label>
                                    <input type="text" name="img2" id="img2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                                </div>
                                <div class="w-full">
                                    <label for="img3" class="block mb-2 text-sm font-medium text-gray-900">Image 3</label>
                                    <input type="text" name="img3" id="img3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                                </div>
                                <div class="w-full">
                                    <label for="img4" class="block mb-2 text-sm font-medium text-gray-900">Image 4</label>
                                    <input type="text" name="img4" id="img4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="link" required />
                                </div>
                                {/* -------------------------------------- */}
                                <div class="w-full">
                                    <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Regular Price</label>
                                    <input type="number" name="regularPrice" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="120" required />
                                </div>
                                <div class="w-full">
                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Reduced Price</label>
                                    <input type="number" name="reducedPrice" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="100" required />
                                </div>
                                <div>
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                    <select id="category" name='category' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
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
                                    <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900">Sold</label>
                                    <input type="number" name="sold" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ex. 12" required />
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Write a product description here..."></textarea>
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <button type="submit" class="text-cyan-500 inline-flex items-center hover:text-white border border-cyan-500 hover:bg-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </section>


            </div>
        </>
    )
}

export default Add