import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register=()=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [errors,setErrors]=useState({})
    const [success,setSuccess]=useState(false)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const handleRegistration=async (e)=>{
        e.preventDefault()
        setLoading(true)
        const userData={
            username,password,email
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
            console.log("response.data is",response.data)
            console.log("registration successful")
            setErrors({})
            setSuccess(true)
            navigate('/login')
        } catch (error) {
            setErrors(error.response.data)
            console.error("registration error is ",error.response.data)
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-light-dark rounded ">
                    <h3 className="text-light text-center">Create an Account</h3>
                    <form action="" onSubmit={handleRegistration}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <small>{errors.username && <div className="text-danger">{errors.username[0]}</div> }</small>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control " placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <small>
                            {errors.email &&
                                errors.email.map((msg, index) => {
                                return <p key={index} className="text-danger">{msg}</p>
   }   )
                            }
                            </small>   
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <small>
                                {errors.password && errors.password.map((msg,index)=>{
                                        return <p key={index} className="text-danger">{msg}</p>
                                }
                                    
                                )}
                                
                            </small>


                        </div>
                        {success && <div class="alert alert-success" role="alert">
Registration Successful </div>}

                        {loading ? <button type="submit" disabled className="d-block mx-auto btn btn-info">Please Wait..</button> :

                        <button type="submit" className="d-block mx-auto btn btn-info">Register</button>


                         }
                                             

                    </form>
                </div>
            </div>

        </div>
        </>
    )
}

export default Register