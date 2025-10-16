import React from 'react'
import Header from '../Common/Header'
import Fotter from '../Common/Fotter'
import Home from '../../pages/Home'
const UserLayout = () => {
  return (
    <>
    {/*Header */}
    <Header/>
    {/*Main */}
    <main>
      <Home/>
    </main>
    {/*Footer */}
    <Fotter/>
    </>
  )
}

export default UserLayout