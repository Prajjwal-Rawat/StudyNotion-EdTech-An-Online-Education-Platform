import React from 'react'
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
                <HighlightText text={" learning any language"}/>
             </div>
             <div className=' w-[70%] text-center text-richblack-600 mx-auto text-base mt-3'>
                Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress tracking , custom schedule and more.
             </div>

             <div className='flex flex-row items-center justify-center mt-8'>
                <img src= {knowYourProgress} className='mr-[-90px]' />
                <img src= {compare_with_others} className='mr-[-8rem]'/>
                <img src= {Plan_your_lessons} className='mr-[-3rem]'/>
             </div>

             <div className='w-fit mb-10'>
             <HButtons active={true} linkto={"/signup"}>Learn More</HButtons>
             </div>
        </div>
    </div>
  )
}

export default HomeCards
