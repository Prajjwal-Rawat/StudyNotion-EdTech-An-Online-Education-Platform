import React from 'react'
import {errorPageImg} from "../assets/Images/errorPageImg.jpg";
import {useNavigate} from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center'>
        <img src= {errorPageImg} alt="Error 404" />
        <h1>Error - 404 Page Not Found</h1>
        <button onClick={() => navigate("/")}>Back To Home</button>
    </div>
  )
}

export default Error
