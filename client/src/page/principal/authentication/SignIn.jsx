import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../auxiliary/AuthProvider';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(res => {
                Swal.fire(
                    'Success',
                    'Logged in Successfully',
                    'success'
                )
                navigate('/');
                console.log(res.user);
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


    // <div className='flex py-20 justify-center'>
    //     <form className='shadow-xl space-y-2 pt-4 bg-yellow-200 px-6 w-80' onSubmit={handleLogIn}>
    //         <p className='text-center pb-12'>Log in here</p>
    //         <div>
    //             {/* <label htmlFor=""></label> */}
    //             <input type="email" name='email' placeholder='email' required className='w-full outline-none bg-blue-50 py-2 px-1 rounded-sm' />
    //         </div>
    //         <div>
    //             {/* <label htmlFor=""></label> */}
    //             <input type="password" name='password' placeholder='password' required className='w-full outline-none bg-blue-50 py-2 px-1 rounded-sm' />
    //         </div>
    //         <div className='pt-12 pb-4'>
    //             <button type='submit' className='btn w-full'>Log in</button>
    //         </div>
    //     </form>
    // </div>

    return (
        <>
            <section class="bg-gray-50">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Log in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handleLogIn}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
                                <p class="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to="/signup" class="font-medium text-primary-600 hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn