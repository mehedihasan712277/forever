import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../../../firebase.config';
import axios from 'axios';



export const AuthContext = createContext();
const providerGl = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(0);
    const [x, setX] = useState(true);
    const [y, setY] = useState(true);

    const handleUpdateProfile = (e) => updateProfile(auth.currentUser, e);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const createUserGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGl)
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const changeX = () => {
        setX(!x);
    }
    const changeY = () => {
        setY(!y);
    }
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/cartL/${user?.uid}`)
            .then(res => {
                setCart(res.data);
            })
    }, [x, user]);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe()
        }
    },
        [])

    const authInfo = {
        user,
        loading,
        x,
        y,
        cart,
        changeX,
        changeY,
        handleUpdateProfile,
        createUser,
        logIn,
        logOut,
        createUserGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider