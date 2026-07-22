import React from 'react'
import { PublicNavbar } from '../Components/PublicNavbar/PublicNavbar'
import { Outlet } from 'react-router-dom'
import {Footer} from "../Components/Footer/Footer"
export const PublicLayout = () => {
  return (
    <>
    <PublicNavbar/>

    <Outlet/>

    <Footer/>
    </>
  )
}
