import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {toast} from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../../Slices/AuthSlice';
import { sendOtp } from '../../../../Services/operations/authApis';


const SignUpForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Confirmpass: "",
    Mobile: ""
  })

  const {Firstname, Lastname, Email, Password, Confirmpass, Mobile} = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(Password !== Confirmpass){
      toast.error("Password do not match");
      setErrMessage("Password do not match");
      return;
    }

    if(Email.split(".").pop() !== "com"){
      toast.error("Invalid Email");
      setErrMessage("Please Enter a valid email");
      return;
    }

    const signupData = {
      ...formData,
      accountType
    }
    
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.Email, navigate));

    setFormData({
      Firstname:"",
      Lastname:"",
      Email:"",
      Password:"",
      Confirmpass:"",
      Mobile:""
    });

    setAccountType("Student");
    setErrMessage("")
  }

  return (
    <div>
      <div className="flex bg-richblack-800 rounded-full py-1 px-3 gap-z-1 my-6 max-w-max gap-x-4">

        <button
          className={`${accountType === "Student" ? "bg-richblack-900 text-white rounded-full py-2 px-4 transition-all duration-200 "
            : "text-richblack-400 bg-transparent"}`}
          onClick={() => setAccountType("Student")}>
          Student
        </button>
        <button
          className={`${accountType === "Instructor" ? "bg-richblack-900 text-white rounded-full py-2 px-4 transition-all duration-200 "
            : "text-richblack-400 bg-transparent"}`}
          onClick={() => setAccountType("Instructor")}>
          Instructor
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-x-4 mt-3">

          <label className="w-full text-[0.875rem] text-richblack-100" htmlFor="firstname">First Name <sup className="text-pink-500">*</sup>

            <input
              required
              type="text"
              placeholder="Enter first name"
              name="Firstname"
              onChange={handleChange}
              value={formData.Firstname}
              id="firstname"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />

          </label>


          <label className="w-full text-[0.875rem] text-richblack-100" htmlFor="lastname">Last Name <sup className="text-pink-500">*</sup>

            <input
              required
              type="text"
              placeholder="Enter last name"
              name="Lastname"
              onChange={handleChange}
              value={formData.Lastname}
              id="lastname"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />

          </label>

        </div>
        <div className="mt-3">

          <label className=" w-full text-[0.875rem] text-richblack-100" htmlFor="email">Email Address<sup className="text-pink-500">*</sup>

            <input
              required
              type="email"
              placeholder="Enter email address"
              name="Email"
              onChange={handleChange}
              value={formData.Email}
              id="email"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />

          </label>

          {
            errMessage === "Please Enter a valid email" && <p className='text-sm text-pink-200'>{errMessage}</p>
          }
        </div>

        <div className="flex flex-row gap-x-4 mt-3" >

          <label className="relative w-full text-[0.875rem] text-richblack-100" htmlFor="createpass">Create Password<sup className="text-pink-500">*</sup>

            <input
              required
              type={showPassword ? ("text") : ("password")}
              placeholder="Enter Password"
              name="Password"
              onChange={handleChange}
              value={formData.Password}
              id="createpass"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />


            <span className="absolute right-2 top-[33px] cursor-pointer " htmlFor="createpass" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<AiFillEyeInvisible fontSize={22} />) : (<AiFillEye fontSize={22} />)}
            </span>

          </label>




          <label className=" relative w-full text-[0.875rem] text-richblack-100" htmlFor="confirmpass">Confirm Password<sup className="text-pink-500">*</sup>

            <input
              required
              type={showConfirmPassword ? ("text") : ("password")}
              placeholder="Confirm Password"
              name="Confirmpass"
              onChange={handleChange}
              value={formData.Confirmpass}
              id="confirmpass"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />

            <span className="absolute right-2 top-[33px] cursor-pointer " onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? (<AiFillEyeInvisible fontSize={22} />) : (<AiFillEye fontSize={22} />)}
            </span>

          {
            errMessage === "Password do not match" &&  <p className='text-sm text-pink-200'>{errMessage}</p>
          }
          </label>


        </div>


        <div className="mt-3">

          <label className=" w-full text-[0.875rem] text-richblack-100" htmlFor="mobile">Mobile No.<sup className="text-pink-500">*</sup>

            <input
              required
              type="number"
              placeholder="Enter Mobile No"
              name="Mobile"
              onChange={handleChange}
              value={formData.Mobile}
              id="mobile"
              className="bg-richblack-800 rounded-[0.5rem] text-white w-full p-[10px] border-b-2 border-richblack-500" />

          </label>
        </div>

        


        <button className="w-full bg-yellow-100 transition-all duration-300 hover:scale-95 active:scale-100 rounded-[8px] text-black  py-2 mt-8 font-bold">
          Create Account
        </button>

      </form>
    </div>
  )
}

export default SignUpForm
