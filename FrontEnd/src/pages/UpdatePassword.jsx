import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { resetPassword } from '../Services/operations/authApis';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import toast from 'react-hot-toast';

const UpdatePassword = () => {

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const { password, confirmPassword } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Password do not match");
      setErrMessage("Password do not match");
      return;
    }

    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate))
    setErrMessage("");
  }


  return (
    <div className='flex flex-col text-white m-auto items-center w-11/12 max-w-maxContent'>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1 className='text-2xl font-semibold text-brown-200'>Choose New Password</h1>
            <p className='w-[430px] mt-3 text-richblack-200'>Almost done. Enter your new password and you're all set.</p>

            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-y-4 mt-6'>

              <label htmlFor="newPassword" className='w-full relative text-[0.875rem] text-slate-100'>New Password <sup className='text-pink-100'>*</sup>
                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                  required
                  type={`${showPassword ? "text" : "password"}`}
                  onChange={handleChange}
                  name='password'
                  value={formData.password}
                  placeholder='Enter Password' />

                <span className="absolute right-2 top-[39px] cursor-pointer " htmlFor="createpass" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (<AiFillEyeInvisible fontSize={22} />) : (<AiFillEye fontSize={22} />)}
                </span>

              </label>

              <label htmlFor="confirmPassword" className='relative w-full text-[0.875rem] text-slate-100'>Confirm Password<sup className='text-pink-200'>*</sup>
                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                  required
                  type={`${showConfirmPass ? "text" : "password"}`}
                  onChange={handleChange}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  placeholder='Confirm Password' />

                <span className="absolute right-2 top-[39px] cursor-pointer " onClick={() => setShowConfirmPass((prev) => !prev)}>
                  {showConfirmPass ? (<AiFillEyeInvisible fontSize={22} />) : (<AiFillEye fontSize={22} />)}
                </span>

                {
                  errMessage && <p className='text-sm text-pink-200'>{errMessage}</p>
                }
              </label>


              <button type="submit"
              className='bg-yellow-100 mt-2 hover:scale-95 active:scale-100 transition-all duration-300 rounded-full text-black font-bold py-3'>
                Reset Password
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

export default UpdatePassword
