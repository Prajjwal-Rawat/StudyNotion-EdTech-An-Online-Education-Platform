import React from 'react'
import errorPageImg from "../assets/Images/errorPageImg.jpg";
import {useNavigate} from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Error = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center text-white items-center'>
        <h1 className='text-xl font-semibold bg-white text-black w-full text-center'>Error - 404 Page Not Found</h1>
        <div>
        <img src= {errorPageImg} alt="Error 404" />
        <button onClick={() => navigate("/")} className='text-blue-200 bg-white w-full text-2xl font-semibold'>
          <div className='flex items-center mb-1 justify-center gap-2'>
          <IoMdArrowRoundBack /> Back To Home
          </div>
          </button>
        </div>
        
    </div>
  )
}

export default Error
