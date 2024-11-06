import React, { useEffect, useState } from 'react'
import {HomePageExplore} from "../../../assets/Data/HomePageExplorer";
import HighlightText from './HighlightText';
import { IoMdPeople } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]


const Tabs = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]); 
    const [course, setCourse] = useState(HomePageExplore[0].courses);

    const clickedCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((ele) => ele.tag === value);
        setCourse(result[0].courses);
    }

  return (
    <div className=' relative flex flex-col items-center  mb-[150px]'>
        <div className='text-3xl font-semibold mb-2'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        <p className='text-base text-richblack-300'>Learn to Build Anything You can imagine</p>

        <div className='flex flex-row gap-5 bg-richblack-700 py-3 px-5 rounded-full mt-8 mb-8 items-center '>
            {
              tabsName.map((ele, index) => {
                return(
                    <div onClick={() => clickedCard(ele)}
                    key={index} className={`cursor-pointer hover:text-richblack-400 transition-all duration-300 ${currentTab === ele ? "bg-richblack-900 py-2 px-4 rounded-full" : ""}`}>
                        {ele}
                    </div>
                )
              })
            }
        </div>
        <div className='flex flex-row gap-10 absolute translate-y-[220px]'>
            {
              course.map((cour, index) => {
                return(
                  <div className='flex gap-2 flex-col bg-richblack-700 w-[350px] px-4 py-5 shadow-md shadow-black hover:scale-105 hover:shadow-lg hover:shadow-black justify-center transition-all duration-30 relative overflow-hidden' key={index}>
                     <span className='bg absolute bg-richblack-900'></span>
                     <h1 className='text-xl font-bold'>{cour.heading}</h1>
                     <p className='text-richblack-100 mb-14'>{cour.description}</p>
                     <hr/>

                     <div className='flex flex-row justify-between text-blue-200'>
                     <p className='flex items-center gap-2'><IoMdPeople /> {cour.level}</p>
                     <p className='flex items-center gap-2'><FaChalkboardTeacher /> {cour.lessonNumber} Lessons</p>
                     </div>

                  </div>
                 
                )
              })
            }
        </div>
    </div>
  )
}

export default Tabs
