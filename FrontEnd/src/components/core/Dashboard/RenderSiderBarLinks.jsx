import React from 'react'
import * as Icons from "react-icons/vsc"
import {Link, useLocation, useNavigate} from "react-router-dom";

const RenderSiderBarLinks = ({link, IconName}) => {

  const Icon = Icons[IconName];
  const navigate = useNavigate();
  const location = useLocation();

  const matchRoute = (route) => location.pathname === route;

  return (
    <Link
    to={link.path}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      matchRoute(link.path)
        ? 'bg-yellow-300 border-l-[3px] border-red-200'
        : 'bg-transparent text-richwhite hover:bg-richblack-700 hover:text-yellow-300'}`}
    >

      <div className='flex items-center gap-2'>
         <span className='text-lg'>{<Icon/>}</span>
         <span className='font-semibold'>{link.name}</span>
      </div>

    </Link>
  )
}

export default RenderSiderBarLinks;
