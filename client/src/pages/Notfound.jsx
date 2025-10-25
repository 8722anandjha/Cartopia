import React from 'react'
import notFound from '../assets/notFound.jpg'
import {Link, useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen  flex flex-col justify-center bg-gray-900 '>
        <img src={notFound} alt="Page Not Found"  className='h-3/4 w-full object-contains'/>
        <Link to="/" className='fixed md:left-9/20  bg-gray-400 text-gray-700 hover:text-blue-500 w-28  text-center top-3/4 active:scale-95 text-xl  p-1 rounded-lg font-semibold'>Home</Link>
    </div>
  )
}

export default Notfound