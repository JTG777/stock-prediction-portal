import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider, { AuthContext } from '../AuthProvider'
import Button from '../components/Button'


const Main = () => {

  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()
  return (
    <>
    <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
        <h1 className='text-light'>Stock Prediction Portal </h1>
        <p className="text-light lead">This stock prediction application utilizes machine learning techniques, specifically employing Keras, and LSTM model, integrated within the Django framework. It forecasts future stock prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by stock analysts to inform trading and investment decisions.</p>
        
        {isLoggedIn? (<Button text="Explore now" class="btn btn-danger" url="/dashboard"/>):
(<button className="btn btn-outline-info" onClick={()=>navigate('/login')} >Login</button>)}
    </div>

    </div>
    
    </>
  )
}

export default Main