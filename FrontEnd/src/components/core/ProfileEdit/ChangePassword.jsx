import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../Services/operations/UpdateProfileApis';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ChangePassword = () => {

    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, reset} = useForm();
    const {token} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = (data) => {
      dispatch(changePassword(token, data));
    }

    useEffect(() => {
      if (isSubmitSuccessful) {
          reset({
            OldPassword: "",
            NewPassword: ""
          });
      }
  }, [isSubmitSuccessful, reset])

  return (
   <div className="text-white flex flex-col ml-[10rem] mb-3 gap-10 mx-auto w-[900px] max-w-5xl mt-10">
      <h1 className="text-3xl font-semibold">Update Password</h1>
   
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
       <div className="flex flex-col bg-richblack-800 p-6 rounded-lg shadow-md gap-6">
         <h1 className="text-xl font-bold">Password</h1>

         <div className='flex gap-6'>
            <label htmlFor="currentPass" className=' relative w-full text-[0.875rem] text-slate-100'>Current Password
                <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                type= {showPassword ? "text" : "password"} 
                name="OldPassword" 
                id="currentPass"
                placeholder='Enter Your Current Password'
                {...register("OldPassword", {required:true})}
                />

                {
                    errors.OldPassword && (
                        <span className='text-red-200'>Please Enter Your Current Password</span>
                    )
                }

                <div className='absolute top-[38px] right-4 cursor-pointer'>
                  {showPassword ? <IoIosEye size={25} onClick={() => setShowPassword(false)}/> : <IoIosEyeOff size={25} onClick={() => setShowPassword(true)}/>}
                </div>
                
            </label>

            <label htmlFor="newPassword" className=' relative w-full text-[0.875rem] text-slate-100'>New Password
               <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
               type={showNewPass ? "text" : "password"} 
               name="NewPassword" 
               id="newPassword"
               placeholder='Enter Your New Password'
               {...register("NewPassword", 
               {
                   required : {value: true, message: "Please Enter Your Password"},
                   minLength: {value: 8, message: "Password should be 8 characters"},
                   maxLength: {value: 16, message: "Password can only be 16 characters"}
               })} 
               />

               {
                errors.NewPassword && (
                    <span className='text-red-200'>{errors.NewPassword.message}</span>
                )
               }

                  <div className='absolute top-[38px] right-4 cursor-pointer'>
                     {
                        showNewPass ? <IoIosEye size={25} onClick={() => setShowNewPass(false)} /> : <IoIosEyeOff size={25} onClick={() => setShowNewPass(true)} />
                     }
                  </div>
            </label>
         </div>
       </div>

       <div className='flex justify-end gap-4'>
         <button onClick={() => navigate("/dashboard/my-profile")} className='bg-richblack-600 px-5 py-2 rounded-lg hover:scale-95 active:scale-100 font-semibold'>
            Cancel
         </button>

         <button type="submit" className='bg-yellow-100 px-5 py-2 rounded-lg text-black font-semibold hover:scale-95 active:scale-100'>
            Update
         </button>
       </div>
    </form>
   </div>
  )
}

export default ChangePassword
