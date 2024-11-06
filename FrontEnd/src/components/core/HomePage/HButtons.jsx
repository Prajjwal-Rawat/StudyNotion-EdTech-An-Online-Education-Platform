import React from 'react'
import { Link } from 'react-router-dom'

const HButtons = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-700"} text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 shadow-sm shadow-white hover:shadow-none`}>
            {children}
        </div>
    </Link>
  )
}

export default HButtons
