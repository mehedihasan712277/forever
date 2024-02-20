import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../auxiliary/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate()
    const [err, setErr] = useState("")

    const checkPassword = (event) => {
        const password = event.target.value;
        if (password.length < 6) {
            setErr("Password must have at leat 6 character");
            return;
        }
        setErr("");
    }
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const data = { name, email, password };
        console.log(data);

        createUser(email, password)
            .then(res => {
                handleUpdateProfile({
                    displayName: name
                })
                Swal.fire(
                    'Success',
                    'Account Created Successfully',
                    'success'
                )
                navigate('/');
                form.reset();
            })
            .catch(err => {
                Swal.fire(
                    'Opps',
                    `${err.message}`,
                    'error'
                )
            })
    }
    return (
        <>
            <section class="bg-gray-50">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Create account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name" required />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" onChange={checkPassword} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    <p className='text-red-700 text-xs' onChange={checkPassword}>{err}</p>
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                                <p class="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to="/signin" class="font-medium text-primary-600 hover:underline">Log in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SignUp