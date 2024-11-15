import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import OtpInput from 'react-otp-input';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../Services/operations/authApis';
import { Link } from 'react-router-dom';
import { FaClockRotateLeft } from "react-icons/fa6";
import { signUp } from '../Services/operations/authApis';



const VerifyEmail = () => {

    const [otp, setOtp] = useState("");

    const {loading, signupData} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {Firstname, Lastname, Email, Password, Confirmpass, Mobile, accountType} = signupData;

    const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(signUp(Firstname, Lastname, Email, Password, Confirmpass, Mobile, otp, accountType, navigate));
    }

  return (
    <div className='text-white flex flex-col items-center m-auto'>
        {
            loading ? (
                <div>Loading...</div>
            ): (
                <div>
                    <h1 className='text-2xl font-semibold text-brown-200'>Verify Email</h1>
                    <p className='w-[430px] mt-3 text-richblack-200'>A verification code has been sent to you. Enter the code below.</p>

                    <form onSubmit={handleSubmit} 
                    className='flex flex-col gap-y-4 mt-6'>
                        <OtpInput
                        value={otp}
                        numInputs={6}
                        onChange={setOtp}
                        inputType='tel'
                        renderSeparator = {<span>-</span>}
                        renderInput={(props) => <input {...props}
                        className="bg-richblack-800 text-white rounded-[0.5rem] text-center border-b-2 border-richblack-100"
                        style={{ width: '50px', height: '50px' }}/>}
                        containerStyle={{
                            display: 'flex',
                            gap: '8px',
                        }}/>

                        <button type="submit"
                        className='bg-yellow-100 mt-2 hover:scale-95 active:scale-100 transition-all duration-300 rounded-full text-black font-bold py-3'>
                          Verify Email
                        </button>
                    </form>

                        <div className='flex justify-between'>
                            <Link to="/login" className='flex mt-2 text-blue-200 w-[118px] cursor-pointer items-center gap-1'>
                            <IoArrowBackCircleSharp />  Back to Login
                            </Link>

                            <button onClick={() => dispatch(sendOtp(Email, navigate))}
                            className='flex mt-2 text-blue-200 w-[118px] cursor-pointer items-center gap-1'>
                               <FaClockRotateLeft /> Resend it
                            </button>
                        </div>
                </div>
            )
        }  
    </div>
  )
}

export default VerifyEmail
