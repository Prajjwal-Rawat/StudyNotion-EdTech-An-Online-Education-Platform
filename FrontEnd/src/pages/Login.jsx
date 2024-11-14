import React from 'react'
import Template from '../components/core/HomePage/Auth/Template'
import loginImg from "../assets/Images/loginImg.jpg";

const Login = () => {
  return (
    <Template
    title={"Welcome Back"}
    desc1={"Build skills for today, tomorrow, and beyond."}
    desc2={"Education to future-proof your carrer."}
    imgUrl={loginImg}
    formType={"login"}/>
  )
}

export default Login
