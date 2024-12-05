import React, { useEffect, useState } from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import HButtons from './HButtons';

const HomeCards = () => {
   return (
      <div>
         <div className='flex flex-col gap-5 mt-[130px] items-center'>
            <div className='text-4xl font-semibold text-center'>
               Your Swiss Knife for
               <HighlightText text={" learning any language"} />
            </div>
            <div className='lg:w-[70%] text-center text-richblack-600 mx-auto text-base mt-3'>
               Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress tracking , custom schedule and more.
            </div>

               <div className='w-[165px] lg:w-full flex flex-row items-center justify-center mt-8'>
                  <img src={knowYourProgress} className='lg:mr-[-90px] lg:w-fit w-[170px] -mr-10' />
                  <img src={compare_with_others} className='lg:mr-[-8rem] lg:w-fit w-[180px] -mr-12' />
                  <img src={Plan_your_lessons} className='lg:mr-[-3rem] lg:w-fit w-[200px] -mr-2'/>
               </div>

            <div className='w-fit mb-10'>
               <HButtons active={true} linkto={"/signup"}>Learn More</HButtons>
            </div>
         </div>
      </div>
   )
}

export default HomeCards
