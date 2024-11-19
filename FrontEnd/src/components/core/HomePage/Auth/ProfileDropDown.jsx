import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import { VscDashboard } from "react-icons/vsc";
import ClickOutSide from '../../../Hooks/ClickOutSide';
import {logout} from "../../../../Services/operations/authApis"
import { RiLogoutCircleLine } from "react-icons/ri";

const ProfileDropDown = () => {
  const {user} = useSelector((state) => state.Profile);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();

  ClickOutSide(ref, () => setOpen(false));

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout(navigate));
    setOpen(false);
  }

  return (
    <div ref={ref} className='relative cursor-pointer' 
    onClick={() => setOpen((prev) => !prev)}>
      <div className='flex items-center gap-1'>
         <img src={user?.UserImageUrl} className='aspect-square w-[30px] rounded-full object-cover'/>
         <IoMdArrowDropdown className='text-lg text-white' />
      </div>

      {
        open && (
          <div onClick={(e) => e.stopPropagation()}
          className="absolute top-[3rem] right-[-10px] rounded-md w-[190px] py-4 text-white bg-richblack-800 z-20">
            <Link
             to="/dashboard/my-profile"
             onClick={() => setOpen(false)}
             >
              <div className="flex gap-x-1 py-[5px]  justify-center  text-sm text-white font-semibold hover:bg-richblack-700 hover:text-richblack-100">
              <VscDashboard className='text-lg'/>
              Dashboard
              </div>
             </Link>

             <hr className='mt-1'/>

             <div className="flex gap-x-1 py-[5px] cursor-pointer  justify-center  text-sm text-white font-semibold hover:bg-richblack-700 hover:text-richblack-100"
             onClick={handleLogout}>
             <RiLogoutCircleLine className='text-lg' />
             Logout
             </div>
          </div>
        )
      }
    </div>
  )
}

export default ProfileDropDown
