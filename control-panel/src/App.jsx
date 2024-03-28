import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainContainer from './MainContainer'
import Error from './pages/Error'
import Orders from './pages/Orders'
import AllProducts from './pages/AllProducts'
import Add from './pages/Add'
import Carts from './pages/Carts'
import Banner from './pages/Banner'
import Details from './pages/Details'
import Update from './pages/Update'
import User from './pages/User'
import Post from './pages/Post'
import Blog from './pages/Blog'


const allRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer></MainContainer>,
    errorElement: <Error></Error>,//This component must be imported
    children: [
      {
        path: "/",
        element: <Orders></Orders>
      },
      {
        path: "/allproducts",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/add",
        element: <Add></Add>
      },
      {
        path: "/carts",
        element: <Carts></Carts>
      },
      {
        path: "/banner",
        element: <Banner></Banner>
      },
      {
        path: "/details/:id",
        element: <Details></Details>
      },
      {
        path: "/update/:id",
        element: <Update></Update>
      },
      {
        path: "/userInfo",
        element: <User></User>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/post",
        element: <Post></Post>
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={allRoute}></RouterProvider>
    </>
  )
}

export default App