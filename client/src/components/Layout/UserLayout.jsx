import React from 'react'
import Header from '../Common/Header'
import Fotter from '../Common/Fotter'
import Home from '../../pages/Home'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
    {/*Header */}
    <Header/>
    {/*Main */}
    <main>
      <Outlet/>
      {/* <Home/> */}
    </main>
    {/*Footer */}
    <Fotter/>
    </>
  )
}

export default UserLayout