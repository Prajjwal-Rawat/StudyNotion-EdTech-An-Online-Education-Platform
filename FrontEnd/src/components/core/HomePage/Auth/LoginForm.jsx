import React, { useState } from 'react'
import {AiFillEyeInvisible} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"
import { useNavigate, Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { login } from '../../../../Services/operations/authApis';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ Email: "", Password: ""});
    const [showPassword, setShowPassword] = useState(false);

    const {errMessage} = useSelector((state) => state.auth);

    function HandleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))

    }

    const {Email, Password} = formData;

    function submitForm(event){
      event.preventDefault();
      dispatch(login(Email, Password,navigate));
    }
    return (
        <form onSubmit={submitForm} className='flex flex-col w-full gap-y-4 mt-6'>

            <label className='w-full text-[0.875rem] text-slate-100' htmlFor="email">Email Address <sup className='text-pink-500'>*</sup>
            <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
            type="email"
            placeholder='Enter email address'
            onChange={HandleChange}
            value={formData.Email}
            required
            name='Email'
            />
            </label>
            {
                (errMessage === "Please enter the valid Email Address" || errMessage === "Email does not found, Please signUp first") && 
                <p className='text-pink-200 text-sm'>*{errMessage}</p>
            }

            <label className=' relative w-full text-[0.875rem] text-slate-100' htmlFor="password">Password <sup className='text-pink-500'>*</sup>
            <input className=" bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
            type={`${showPassword ? "text" : "password"}`}
            placeholder='Enter Password'
            onChange={HandleChange}
            required
            value={formData.Password}
            name='Password'
            />
            <span className="absolute right-2 top-[40px] cursor-pointer " onClick={()=> setShowPassword((prev)=> !prev)}>
                {showPassword ? (<AiFillEyeInvisible fontSize={22} />):(<AiFillEye fontSize={22} />)}
            </span>

            
            <Link to="/forgot-password">
                <p className="text-xs text-blue-200 mt-1 absolute right-1">
                    Forget Password
                </p>
            </Link>

            </label>

            {
                errMessage === "Password Invalid, Please enter the correct password" && 
                <p className='text-sm text-pink-200'>{errMessage}</p>
            }

            


            <button className="w-full bg-yellow-50 rounded-[8px] text-black  py-2 mt-8 font-bold hover:bg-yellow-100 active:scale-100 transition-all duration-300 hover:scale-95">
                Sign in
            </button>

        </form>

    )
}

export default LoginForm
