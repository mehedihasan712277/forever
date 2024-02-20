import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Private = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <>
            <div className=' w-full flex justify-center py-60'>
                <span className="loading loading-infinity loading-lg bg-red-500"></span>
            </div>
        </>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to="/signin"></Navigate>
    )
}

export default Private