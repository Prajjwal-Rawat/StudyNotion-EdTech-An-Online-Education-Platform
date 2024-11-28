import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import navLogo from "../../assets/Logos/Logo.png";
import { NavbarLinks } from "../../assets/Data/NavLinks";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from '../core/HomePage/Auth/ProfileDropDown';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/Apis';
import { MdKeyboardArrowDown } from "react-icons/md";


const NavBar = () => {

  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.Profile);

  const [subLinks, setSubinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      setSubinks(response.data.Categories);
    } catch (err) {
      console.log("Can not find categories list ", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCategories()
  }, [])


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-600 shadow-sm shadow-white'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={navLogo} width={160} height={42} loading="lazy" />
        </Link>

        <nav>
          <ul className='flex text-richblack-25 gap-x-6'>
            {
              NavbarLinks.map((tabs, index) => {
                return (
                  tabs.title === "Catalog" ? (<div key={index} className='relative cursor-pointer hover:text-richblack-300 flex items-center gap-1 group'>
                    {tabs.title}
                    <MdKeyboardArrowDown />

                    <div className=' invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[-10.3rem] z-10 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                      <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                      </div>
                      {
                        loading ? (
                          <p>Loding...</p>
                        ): subLinks && subLinks.length > 0 ? (
                          <>
                          {
                            subLinks.map((catalog, index) => (
                              <Link to={`/catalog/${catalog.Category.split(" ").join("-").toLowerCase()}`} key={index} className='rounded-lg bg-transparent hover:scale-110 font-semibold py-4 pl-4 hover:bg-richblack-400'>
                                  <p>{catalog.Category}</p>
                              </Link>
                            ))
                          }
                          </>
                        ):(<p> No Course Found </p>)
                      }

                    </div>
                  </div>) : (
                    <NavLink to={tabs?.path} key={index} className={`cursor-pointer hover:text-richblack-200`}>
                      {tabs.title}
                    </NavLink>
                  )
                )
              })
            }
          </ul>
        </nav>

        <div className='flex gap-8 items-center'>
          {
            user && user?.AccountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <FaCartShopping className='text-2xl text-white' />
                {
                  totalItems > 0 && (
                    <span className=' absolute top-2 left-5 text-white  w-5 h-5 text-center  font-semibold rounded-full'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            !token ? (
              <div className='flex gap-2 items-center justify-center'>
                <Link to="/login">
                  <button className=' border border-richblack-700 shadow-sm hover:bg-richblack-900 active:scale-90 active:shadow-none shadow-richblack-100 bg-richblack-800 px-[14px] py-[6px] text-richblack-100 rounded-md'>
                    Log In
                  </button>
                </Link>
                <Link to="/Signup">
                  <button className=' border border-richblack-700 shadow-sm hover:bg-richblack-900 active:scale-90 active:shadow-none shadow-richblack-100 bg-richblack-800 px-[14px] py-[6px] text-richblack-100 rounded-md'>
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (<ProfileDropDown />)
          }

        </div>
      </div>
    </div>
  )
}

export default NavBar
