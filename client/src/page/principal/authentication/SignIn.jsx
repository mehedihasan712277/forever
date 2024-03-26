import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../auxiliary/AuthProvider';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        logIn(email, password)
            .then(res => {
                Swal.fire(
                    'Success',
                    'Logged in Successfully',
                    'success'
                )
                navigate('/');
                form.reset();
                setLoading(false);
            })
            .catch(err => {
                Swal.fire(
                    'Opps',
                    `${err.message}`,
                    'error'
                );
                setLoading(false);
                console.log(err);
            })
    }

    return (
        <>
            {
                loading &&
                <div className='fixed top-0 left-0 w-full h-screen z-20 text-center' style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}>
                    {/* <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-cyan-500 loading loading-infinity loading-lg"></span> */}
                    <div className='text-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                        <span>Please Wait</span>
                        <span className="loading loading-dots loading-xs -mb-2"></span>
                    </div>
                </div>
            }
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Log in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogIn}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline">Sign up</Link>
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