import React from 'react'
import HButtons from './HButtons'
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position, heading, subHeading, Hbtn1, Hbtn2, codeBlock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20  justify-between `}>

      {/* section 1 */}

      <div className='flex flex-col w-[50%] gap-8'>
        {heading}
        <div className='font-bold text-richblack-300 '>
          {subHeading}
        </div>

        <div className='flex gap-7 mt-7'>
          <HButtons active={Hbtn1.active} linkto={Hbtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {Hbtn1.btnText}
              <FaArrowRightLong />
            </div>
          </HButtons>

          <HButtons active={Hbtn2.active} linkto={Hbtn2.linkto}>
            {Hbtn2.btnText}
          </HButtons>
        </div>
      </div>

      {/* section 2 */}


      <div className='h-fit flex flex-row w-screen lg:w-[500px] py-4 relative'>

        <span className={`${backgroundGradient} opacity-20 w-[270px] h-[200px] rounded-full absolute top-[-10px] left-[-10px]`}></span>
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>

          <TypeAnimation
            sequence={[codeBlock, 1000, ""]}
            speed={50}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line", display: 'block' }}
          />
        </div>
      </div>
      
    </div>
  )
}

export default CodeBlocks;
