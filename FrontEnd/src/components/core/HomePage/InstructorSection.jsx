import React from 'react'
import InstructorImg from "../../../assets/Images/Instructor.jpg";
import HighlightText from './HighlightText';
import HButtons from './HButtons';
import { FaArrowRightLong } from "react-icons/fa6";


const InstructorSection = () => {
  return (
    <div>
       <div className='flex flex-row gap-20 lg:items-center'>
            <div className='w-[50%] mt-[100px]'>
                <img src= {InstructorImg} className='lg:w-[50rem] lg:h-[40rem] h-fit shadow-instructorShadow' />
            </div>

            <div className='flex flex-col w-[50%] gap-10'>
                 <div className='text-4xl font-semibold'>
                    Become an <br/> <HighlightText text={'Instructor'}/>
                 </div>
                 <p className='text-[16px] font-medium text-richblack-50'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                 <div className='w-fit'>

                 <HButtons active={true} linkto={"/signup"}>
                 <div className='flex gap-2 items-center'>
                    Start Teaching Today
                    <FaArrowRightLong/>
                 </div>
                 </HButtons>

                 </div>
            </div>
       </div>
    </div>
  )
}

export default InstructorSection
