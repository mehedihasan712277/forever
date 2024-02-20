import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//import Error from './Error'                    (import yourself)
//import AuthProvider from './AuthProvider'      (import yourself)


const allRoute = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <Error></Error>,//This component must be imported
    children: [
      {
        path: "/",
        element: <></>
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