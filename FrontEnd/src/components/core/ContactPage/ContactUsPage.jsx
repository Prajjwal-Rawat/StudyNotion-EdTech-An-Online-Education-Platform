import React from 'react'
import { AiFillMessage } from "react-icons/ai";
import { IoGlobeSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import ContactUsForm from "../ContactPage/ContactUsForm";
import Footer from '../../common/Footer';
import ReviewSlider from '../../common/ReviewSlider';

const contact = [
  {
    icon: <AiFillMessage />,
    heading: "Chat on us",
    des1: "Our Friendly team is here to help",
    des2: "info@prajjwalrawat@gmail.com"
  },
  {
    icon: <IoGlobeSharp />,
    heading: "Visit Us",
    des1: "Come and say hello at our office HQ",
    des2: "123-Address-New Delhi, 110073"
  },
  {
    icon: <IoCall />,
    heading: "Chat Us",
    des1: "Mon - Fri From 8am to 5pm",
    des2: "+93 222 5555"
  }
]

const ContactUsPage = () => {
  return (
    <div>

    <div className='w-11/12 max-w-maxContent mx-auto text-white mt-[5rem]'>

      <div className='flex gap-10 justify-between'>
        <div className='flex flex-col gap-10 bg-richblack-800 p-10 w-[40%] h-fit rounded-xl'>
          {
            contact.map((ele, index) => {
              return (
                <div key={index}>
                  <div className='flex items-center gap-2'>
                    <p className='text-xl'>{ele.icon}</p>
                    <h1 className='text-xl font-semibold'>{ele.heading}</h1>
                  </div>
                  <p className='mt-1 text-richblack-300'>{ele.des1}</p>
                  <p className='text-richblack-300'>{ele.des2}</p>
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-col border p-16 h-fit w-[60%] rounded-xl'>
          <h1 className='text-4xl font-semibold'>Got a Idea? We've got the skills. Let's team up</h1>
          <p>Tell us more about yourself and what you're got in mind</p>
          <ContactUsForm />
        </div>

      </div>

      <div className='flex flex-col items-center mt-[8rem]'>
        <h1 className='text-3xl font-semibold'>Reviews from other learners</h1>
        <ReviewSlider/>
      </div>
    </div>
      <Footer/>
  </div>
  )
}

export default ContactUsPage
