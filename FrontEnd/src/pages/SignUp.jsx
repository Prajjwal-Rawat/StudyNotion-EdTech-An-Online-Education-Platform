import React from 'react'
import Template from '../components/core/HomePage/Auth/Template'
import signUpImg from "../assets/Images/signupImg.jpg";

const SignUp = () => {
  return (
    <Template
    title={"Join the millions learning to code with StudyNotion for free"}
    desc1={"Build skills for today, tomorrow, and beyond."}
    desc2={"Education to future-proof your carrer."}
    formType={"signup"}
    imgUrl={signUpImg}/>
  )
}

export default SignUp
