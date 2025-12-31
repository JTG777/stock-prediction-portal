import React, { useContext } from 'react'
import AuthProvider, { AuthContext } from './AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isLoggedIn}=useContext(AuthContext)

  return isLoggedIn? (children): (<Navigate to='/login'/>)
  
}

export default PrivateRoute