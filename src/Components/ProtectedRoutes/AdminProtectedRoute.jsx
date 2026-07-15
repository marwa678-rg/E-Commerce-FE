import React from 'react'
import { Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminProtectedRoute = () => {
const user = useSelector((state)=>state.user.user)

//Get Token 
  const token = localStorage.getItem("token");
 if(!token){
  return <Navigate  to="/login"/>
 }
//Check user
if(!user){
  return  <Spinner animation="border" variant="dark" />
}
//Check Role
if(user.role !== "admin" && user.role !== "super_admin"){

return<Navigate  to="/"/>
}


  return (
    
    <Outlet />
    
  )
}
