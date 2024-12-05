import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import navLogo from "../../assets/Logos/Logo.png";
import { NavbarLinks } from "../../assets/Data/NavLinks";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from '../core/HomePage/Auth/ProfileDropDown';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/Apis';
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";


const NavBar = () => {

  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.Profile);
  const menuRef = useRef();

  const [subLinks, setSubinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-600 shadow-sm shadow-white'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={navLogo} loading="lazy" className='lg:w-[160px] lg:h-[30px] w-[120px]' />
        </Link>

        {
          !isSmallScreen && (
            <nav>
              <ul className='flex text-richblack-25 gap-x-6'>
                {
                  NavbarLinks.map((tabs, index) => {
                    return (
                      tabs.title === "Catalog" ? (<div key={index} className='relative cursor-pointer hover:text-richblack-300 flex items-center gap-1 group'>
                        {tabs.title}
                        <MdKeyboardArrowDown />

                        <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[-10.3rem] z-10 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                          <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                          </div>
                          {
                            loading ? (
                              <p>Loding...</p>
                            ) : subLinks && subLinks.length > 0 ? (
                              <>
                                {
                                  subLinks.map((catalog, index) => (
                                    <Link to={`/catalog/${catalog.Category.split(" ").join("-").toLowerCase()}`} key={index} className='rounded-lg bg-transparent hover:scale-110 font-semibold py-4 pl-4 hover:bg-richblack-400'>
                                      <p>{catalog.Category}</p>
                                    </Link>
                                  ))
                                }
                              </>
                            ) : (<p> No Course Found </p>)
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
          )
        }

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
              <div className='flex gap-2 items-center justify-center mr-3'>
                <Link to="/login">
                  <button className=' border border-richblack-700 shadow-sm hover:bg-richblack-900 active:scale-90 active:shadow-none shadow-richblack-100 bg-richblack-800 lg:px-[14px] lg:py-[6px] px-3 py-1 text-richblack-100 rounded-md'>
                    Log In
                  </button>
                </Link>
                <Link to="/Signup">
                  <button className=' border border-richblack-700 shadow-sm hover:bg-richblack-900 active:scale-90 active:shadow-none shadow-richblack-100 bg-richblack-800 px-2 py-1 lg:px-[14px] lg:py-[6px] text-richblack-100 rounded-md'>
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (<ProfileDropDown />)
          }

        </div>
      </div>

      <div className='text-white relative'>
        {
          isSmallScreen && (
            <div ref={menuRef}>
              <div onClick={() => setOpenMenu((prev) => !prev)} className="cursor-pointer">
                {
                  openMenu ? <BiMenuAltRight size={23} /> : <BiMenu size={23} /> 
                }
              </div>

              {
                openMenu && (
                  <div className='absolute top-12 right-0 z-10 w-[240px] bg-richblack-800 rounded-lg shadow-lg animate-slideIn'>
                <nav>
                <ul className='flex flex-col gap-3 text-richblack-25 p-4'>
              {NavbarLinks.map((tabs, index) => (
                tabs.title === "Catalog" ? (
                  <div key={index} className='relative cursor-pointer hover:text-richblack-300 group'>
                    <div className='flex items-center justify-between'>
                      <span>{tabs.title}</span>
                      <MdKeyboardArrowDown />
                    </div>
                    {/* Catalog Submenu */}
              
                    <div className='absolute z-50 top-full left-0 w-full bg-richblack-900 rounded-md shadow-lg mt-2 p-2 hidden group-hover:block'>
                      {loading ? (
                        <p className="text-center text-sm text-richblack-200">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((catalog, index) => (
                          <Link
                            key={index}
                            to={`/catalog/${catalog.Category.split(" ").join("-").toLowerCase()}`}
                            className='block py-2 px-4 text-richblack-200 rounded-lg hover:bg-richblack-700 transition-transform duration-200 hover:scale-105'
                          >
                            {catalog.Category}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center text-sm text-richblack-200">No Course Found</p>
                      )}

                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={tabs?.path}
                    className='block py-2 px-4 text-richblack-200 rounded-lg hover:bg-richblack-700 transition-all duration-200 hover:scale-105'
                  >
                    {tabs.title}
                  </NavLink>
                )
              ))}
            </ul>
                </nav>
              </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default NavBar
