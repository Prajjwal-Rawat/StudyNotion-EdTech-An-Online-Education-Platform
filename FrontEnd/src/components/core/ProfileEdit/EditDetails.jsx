import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateProfileDetails } from '../../../Services/operations/UpdateProfileApis';

const EditDetails = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.Profile);

    const today = new Date().toISOString().split("T")[0];

    const submitProfileDetails = (data) => {
        dispatch(UpdateProfileDetails(token, data));
    }


    return (
        <div className="text-white flex flex-col mb-3 gap-10 mx-auto w-[900px] max-w-5xl mt-10">
            <h1 className="text-3xl font-semibold">Update Profile Details</h1>

            <form onSubmit={handleSubmit(submitProfileDetails)} className="space-y-6">
                <div className="flex flex-col bg-richblack-800 p-6 rounded-lg shadow-md gap-6">
                    <h1 className="text-xl font-bold">Profile Information</h1>
                    <div className="flex flex-col gap-y-6">

                        <div className='flex justify-between gap-x-16'>

                            <label htmlFor="firstName" className='w-full text-[0.875rem] text-slate-100'>First Name 
                                <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    type="text"
                                    placeholder="Enter Your First Name"
                                    name='FirstName'
                                    id='firstName'
                                    {...register("FirstName", { required: true })}
                                    defaultValue={user?.FirstName}
                                />

                                {
                                    errors.FirstName && (
                                        <span className='text-red-200'>
                                            Please Enter Your First Name
                                        </span>
                                    )
                                }
                            </label>

                            <label htmlFor="lastName" className='w-full text-[0.875rem] text-slate-100'>Last Name
                                <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    type="text"
                                    placeholder='Enter Your Last Name'
                                    name='LastName'
                                    id='lastName'
                                    {...register("LastName", { required: true })}
                                    defaultValue={user?.LastName}
                                />

                                {
                                    errors.LastName && (
                                        <span className='text-red-200'>
                                            Please Enter Your Last Name
                                        </span>
                                    )
                                }
                            </label>

                        </div>

                        <div className='flex justify-between gap-x-16'>
                            <label htmlFor="DOB" className='w-full text-[0.875rem] text-slate-100'>Date Of Birth
                                <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    type="date"
                                    name="DateOfBirth"
                                    id="DOB"
                                    placeholder='Enter Your DOB'
                                    {...register("DateOfBirth",
                                        {
                                            max: { value: today, message: "Date of Birth cannot be in the future" }
                                        })}
                                    defaultValue={user?.AdditionalDetails.DateOfBirth}
                                />

                                {
                                    errors.DateOfBirth && (
                                        <span className='text-red-200'>{errors.DateOfBirth.message}</span>
                                    )
                                }
                            </label>

                            <label htmlFor="gender" className='w-full text-[0.875rem] text-slate-100'>Gender
                                <select className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    name="Gender"
                                    id="gender"
                                    {...register("Gender")}
                                    defaultValue={user?.AdditionalDetails?.Gender}
                                >
                                    <option value="" disabled >Select Your Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                        </div>

                        <div className='flex justify-between gap-x-16'>
                            
                            <label htmlFor="mobileNo" className='w-full text-[0.875rem] text-slate-100'>Contact Number
                                <input className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    type="number"
                                    name="MobileNo"
                                    id="mobileNo"
                                    placeholder='Enter Your Phone No'
                                    {...register("MobileNo")} 
                                    defaultValue={user?.MobileNo}/>
                            </label>

                            <label htmlFor="profession" className='w-full text-[0.875rem] text-slate-100'>Profession
                                <select className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    name="Profession"
                                    id="profession"
                                    {...register("Profession")}
                                    defaultValue={user?.AdditionalDetails?.Profession}
                                    >
                                    <option value="" disabled >Select Your Profession</option>
                                    <option value="Software Developer">Software Developer</option>
                                    <option value="Data Analyist">Data Analyist</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="about" className='w-full text-[0.875rem] text-slate-100'>About
                                <textarea className="bg-richblack-600 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                                    name="About"
                                    id="about"
                                    placeholder='Tell Us About YourSelf'
                                    cols="25"
                                    rows="5"
                                    {...register("About")}
                                    defaultValue={user?.AdditionalDetails?.About}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className='flex gap-4 justify-end '>

                    <button onClick={() => navigate("/dashboard/my-profile")} className='bg-richblack-600 px-5 py-2 rounded-lg hover:scale-95 active:scale-100 font-semibold'>
                        Cancel
                    </button>

                    <button type="submit" className='bg-yellow-100 px-5 py-2 rounded-lg text-black font-semibold hover:scale-95 active:scale-100'>
                        Save
                    </button>

                </div>
            </form>
        </div>
    )
}

export default EditDetails
