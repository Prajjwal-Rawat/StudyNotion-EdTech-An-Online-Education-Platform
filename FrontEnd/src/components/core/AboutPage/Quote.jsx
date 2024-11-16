import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='w-[71%] text-center text-3xl font-semibold text-white'>
      We are passionate about revolutionizing the way we learn. Our innovation platform 
      {" "}<HighlightText text={"combines technology"}/>
      <span className='text-brown-200'>
        {" "}
        expertise
      </span>
      , and community to create an 
      <span className='bg-yellow-golden bg-clip-text text-transparent'>
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote
