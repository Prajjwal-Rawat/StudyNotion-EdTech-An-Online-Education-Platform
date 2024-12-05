import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from "./SignUpForm"
import frameImg from "../../../../assets/Images/loginPattern.jpg";
import { FcGoogle } from "react-icons/fc";

const Template = ({title, desc1, desc2, formType, imgUrl}) => {
  return (
    <div className="flex justify-between  py-5 m-auto w-11/12 max-w-[1160px] text-white ">

               <div className="w-11/12 max-w-[450px]">
                   <h1 className="text-4xl py-1 leading-10 font-semibold">{title}</h1>
                   <p className="text=[1.125rem leading[1.625] mt-4">
                     <span className="text-slate-300">{desc1}</span>
                   </p>
                    <p>
                     <span className="text-blue-300 capitalize">{desc2}</span>
                   </p>

                   {formType === "login" ? <LoginForm/> : <SignUpForm/>}


                   <div className="flex w-full items-center my-4 gap-x-2">

                    <div className="w-full h-[1px] bg-slate-400"></div>
                    <p>Or</p>
                    <div className="w-full h-[1px] bg-slate-400"></div>

                   </div>


                   <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-300 border border-richblack-300
                   py-[12px] px-8px] gap-2 hover:bg-white hover:text-black transition-all duration-300 hover:scale-95 active:scale-100">
                    <FcGoogle/>
                    Sign up with Google
                    </button>

               </div>

               <div className="relative w-11/12 max-w-[450px] hidden lg:block">
                <img className="py-8" src={frameImg} alt="loading" width={558} height={504} loading="lazy"/>
                <img className="absolute -top-6 right-6 py-8"
                src={imgUrl} alt="loading" width={558} height={490} loading="lazy"/>
               </div>

       </div>
  )
}

export default Template
