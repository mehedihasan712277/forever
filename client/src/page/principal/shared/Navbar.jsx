import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auxiliary/AuthProvider";
import { FaHouse } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";


const Navbar = () => {
    const { user, cart, logOut } = useContext(AuthContext);
    // console.log(cart);
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <p className="text-xl">
                        <Link to="/" className="flex gap-1">
                            <FaHouse></FaHouse>
                            <span className="text-xl">martfury</span>
                        </Link>
                    </p>
                </div>
                <div className="flex-none space-x-3 sm:space-x-4">
                    <Link to="/blog">Blog</Link>
                    {
                        user && <Link to="/order">Orders</Link>

                    }
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-end">
                                    <Link to='/mycart'>
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                {
                                                    Boolean(cart.length) && <span className="badge badge-sm indicator-item">{cart.length}</span>
                                                }
                                                {/* <span className="badge badge-sm indicator-item">{cart.length}</span> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn bg-transparent outline-none border-none hover:bg-transparent px-0 shadow-none">
                                        <div className="w-10 rounded-full flex items-center justify-center">
                                            <p className="text-5xl"><MdAccountCircle></MdAccountCircle></p>
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link to="profile">
                                                Profile
                                                {/* <span className="badge">New</span> */}
                                            </Link>
                                        </li>
                                        <li onClick={logOut} className="cursor-pointer"><p>Logout</p></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <div className="flex gap-3 sm:gap-4">
                                <Link to="/signin"><p>Login</p></Link>
                                <Link to="/signup"><p>Register</p></Link>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
