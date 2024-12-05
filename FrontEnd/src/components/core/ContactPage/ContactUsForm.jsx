import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {toast} from "react-hot-toast";
import {apiConnector} from "../../../Services/apiConnector";
import {CONTACTUS_API} from "../../../Services/Apis";
import {countryCode} from "../../../assets/Data/CountryCode";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();


    const submitContactFormDetails = async (data) => {
        const toastId = toast.loading("Sending...");
        setLoading(true)
        try{
           const response = await apiConnector("POST", CONTACTUS_API, data);

        //    console.log("contact us response -> ", response);
           toast.success("Contact Mail Sent successfully");
        }catch(err){
           console.log("Error in sending contact mail ", err);
           toast.error("Failed to Send Mail");
        }finally{
            toast.dismiss(toastId);
            setLoading(false);
        }
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNumber: ""
            });
        }
    }, [isSubmitSuccessful, reset])


    return (
        <form onSubmit={handleSubmit(submitContactFormDetails)} className='flex flex-col gap-y-4 mt-6'>

            <div className='lg:flex gap-5'>
                <label htmlFor="firstName" className='w-full text-[0.875rem] text-slate-100'>First Name
                    <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        {...register("firstName", { required: true })}
                    />
                    {
                        errors.firstName && (
                            <span className='text-pink-200'>
                                Please Enter Your Name
                            </span>
                        )
                    }
                </label>


                <label htmlFor="lastName" className='w-full text-[0.875rem] text-slate-100'>Last Name
                    <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        {...register("lastName")}
                    />
                </label>

            </div>

            <label htmlFor="email" className='w-full text-[0.875rem] text-slate-100'>Email Address
                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    {...register("email", { required: true })}
                />

                {
                    errors.email && (
                        <span className='text-pink-300'>Please enter your email address</span>
                    )
                }

            </label>

            <div className='flex flex-col'>

            <label htmlFor="phoneNumber" className='w-full items-center gap-3 text-[0.875rem] text-slate-100'>Mobile No

                <div className='flex items-center gap-4'>

                <select className='bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-[49px] h-12 border-b-2 border-richblack-100'
                name="dropdown"
                id="countryCode"
                {...register("countryCode", {required:true})}>

                    {
                      countryCode.map((country, index) => {
                        return(
                            <option key={index} value="country">{country.code} - {country.country}</option>
                        )
                      })
                    }

                </select>


                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                    type="number"
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Enter Mobile Number'
                    {...register("phoneNumber", 
                    { required: {value: true, message:"Plase Enter Your Mobile Number"}, 
                      maxLength:{value:10, message:"Invalid Phone Number"},
                      minLength:{value:8, message:"Invalid Phone Number"}
                    })}
                />

                </div>

                {
                    errors.phoneNumber && (
                        <span className='text-pink-300'>{errors.phoneNumber.message}</span>
                    )
                }


            </label>

            </div>

            <label htmlFor="message" className='w-full text-[0.875rem] text-slate-100'>Message
                <textarea className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder='Enter Your Message here'
                    {...register("message", { required: true })}
                />

                {
                    errors.message && (
                        <span className='text-pink-300'>Please Enter your message</span>
                    )
                }

            </label>

            <button type="submit" className="w-full bg-yellow-50 rounded-[8px] text-black  py-2 mt-4 font-bold hover:bg-yellow-100 active:scale-100 transition-all duration-300 hover:scale-95">
                Send Message
            </button>

        </form>
    )
}

export default ContactUsForm;
