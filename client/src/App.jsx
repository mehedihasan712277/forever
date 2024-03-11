import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainContainer from './page/principal/MainContainer'
import Error from './page/auxiliary/Error'
import AuthProvider from './page/auxiliary/AuthProvider'
import Home from './page/principal/public/Home'
import SignUp from './page/principal/authentication/SignUp'
import SignIn from './page/principal/authentication/SignIn'
import Details from './page/principal/public/Details'
import MyCart from './page/principal/private/MyCart'
import Orders from './page/principal/private/Orders';
import Private from './page/auxiliary/Private';
import Profile from './page/principal/private/Profile'
import Address from './page/principal/private/Address'
import Blog from './page/blog/Blog'

const allRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer></MainContainer>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/mycart",
        element: <Private><MyCart></MyCart></Private>
      },
      {
        path: "/products/item",
        element: <Details></Details>
      },
      {
        path: "/order",
        element: <Private><Orders></Orders></Private>
      },
      {
        path: "/profile",
        element: <Private><Profile></Profile></Private>
      },
      {
        path: "/address",
        element: <Private><Address></Address></Private>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
    ]
  }
])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={allRoute}></RouterProvider>
    </AuthProvider>
  )
}

export default App