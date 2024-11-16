import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Get In Touch</h1>
        <p className='text-richblack-300'>We'd love to here for you, Please fill out this form. </p>

        <div>
           <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection
