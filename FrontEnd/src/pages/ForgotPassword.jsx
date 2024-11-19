import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getPasswordResetToken } from '../Services/operations/authApis';

const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {errMessage} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='text-white flex flex-col items-center m-auto w-11/12 max-w-maxContent'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1 className='text-2xl font-semibold text-brown-200'>
                            {
                                !emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>

                        <p className='w-[430px] mt-3 text-richblack-200'>
                            {
                                !emailSent ? "Have no fear. We'll email you instructuons to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleSubmit} 
                        className='flex flex-col w-full gap-y-4 mt-6'>
                            {
                                !emailSent && (
                                    <label htmlFor="email" className='w-full text-[0.875rem] text-slate-100'>Email Address <sup className='text-pink-100'>*</sup>
                                        <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                        type="email"
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address' />
                                    </label>
                                    
                                )
                            }
                            {
                                (errMessage === "Email is not valid, Please enter a valid email address" || errMessage === "Email not found, Please create a account first, SignIn to StudyNotion") 
                                &&  <p className='text-red-200'>{errMessage}</p>
                                
                            }

                            <button type="submit"
                            className='bg-yellow-100 mt-2 hover:scale-95 active:scale-100 transition-all duration-300 rounded-full text-black font-bold py-3'>
                                {
                                    !emailSent ? "Reset Password" : "Resent Email"
                                }
                            </button>
                        </form>

                        <div>
                            <Link to="/login" className='flex mt-2 text-blue-200 w-[118px] cursor-pointer items-center gap-1'>
                            <IoArrowBackCircleSharp />  Back to Login
                            </Link>
                        </div>
                    </div>
                )
       }
        </div>
    )
}

export default ForgotPassword
