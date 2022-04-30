import Cookies from 'js-cookie'
import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const VerifyAuth = () => {
    var navigate = useNavigate();
  return Cookies.get("access-token") ? <Outlet /> : <Navigate to='/Dashboard' />
}
export default VerifyAuth