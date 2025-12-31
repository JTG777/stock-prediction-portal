import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)


  const handleSubmit=async (e)=>{
      e.preventDefault()
      setLoading(true)
      const userData={
        username,password
      }

      try {
        const response=await axios.post('http://127.0.0.1:8000/api/v1/token/',userData)
        localStorage.setItem('accessToken',response.data.access)
        localStorage.setItem('refreshToken',response.data.refresh)
        console.log("login authenticated")
        setIsLoggedIn(true)
        navigate('/dashboard')
        

      } catch (error) {
        console.error("login error is ",error.response.data)

        setError(error.response.data.detail)
        console.log(error)
      }finally{
        setLoading(false)
      }

  }

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center bg-light-dark rounded ">
            <h3 className="text-light">Login</h3>
            <form className='form-group' onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text " placeholder='Enter Username' className='form-control' onChange={(e)=>setUsername(e.target.value)} value={username}/>


              </div>
              <div className="mb-3">
                <input type="password" placeholder='Enter Password' className='form-control' onChange={(e)=>setPassword(e.target.value)} value={password}/>


              </div>
              {error && <div class="alert alert-danger" role="alert">{error}</div>  }
              
              

              <div className="mb-3">
                {loading ? (<button className="btn btn-info" type="submit" disabled>loading...</button>)
                :(<button className="btn btn-info" type="submit">Login</button>)}
              </div>

            </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default Login