import React from 'react'
import logo1 from "../../../assets/timelineLogos/logo1.png"
import logo2 from "../../../assets/timelineLogos/logo2.png"
import logo3 from "../../../assets/timelineLogos/logo3.png"
import logo4 from "../../../assets/timelineLogos/logo4.png"
import timelineImg from "../../../assets/Images/timelineImg.jpg";

const timeline = [
    {
        Logo: logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company. And Always Supportive",

    },
    {
        Logo: logo2,
        heading: "Strategic Direction",
        Description: "Empowering teams with clear goals and innovative solutions.",

    },
    {
        Logo: logo3,
        heading: "Innovation Catalyst",
        Description: "Inspiring breakthroughs that shape the future of our industry.",

    },
    {
        Logo: logo4,
        heading: "Problem Solver",
        Description: "Tackling challenges head-on to ensure continuous growth.",

    },
]
const TimeLineSection = () => {
  return (
    <div>
       <div className='lg:flex gap-16 items-center mt-3 text-white'>
          <div className='flex flex-col lg:w-[45%]'>
             {
                timeline.map((ele, index) => {
                   return(
                    <div className='flex flex-row gap-2 items-center' key={index}>
                         <div className='lg:w-[130px] lg:h-[120px] w-[90px] h-[90px] justify-center flex flex-col items-center bg-none'>
                           <img src= {ele.Logo}/>
                           {/* <p className='w-[1px] h-[300px] border border-black border-dashed'></p>  */}
                         </div>

                         <div>
                            <h2 className='font-semibold text-[18px]'>{ele.heading}</h2>
                            <p className='text-base text-richblack-400'>{ele.Description}</p>
                         </div>
                    </div>
                   )
                })
             }
          </div>


          <div className='relative lg:w-[55%] mt-6 lg:mt-0 w-screen'>
              <img src={timelineImg} className=' shadow-md shadow-black object-cover h-fit' />

              <div className='absolute bg-caribbeangreen-700 py-6 lg:px-2 translate-x-5 lg:translate-x-32 translate-y-[-50%] flex text-white uppercase'>
                  <div className='flex gap-5 items-center px-7 border-r-2 border-caribbeangreen-25'>
                     <h1 className='lg:text-3xl font-bold'>10</h1>
                     <p className='text-caribbeangreen-25 lg:text-md text-sm'>Years of <br/> Experience</p>
                  </div>

                  <div className='flex gap-5 items-center px-7'>
                     <h1 className='lg:text-3xl font-bold'>200</h1>
                     <p className='text-caribbeangreen-25 lg:text-md text-sm'>Types of <br/> courses</p>

                  </div>

              </div>
          </div>
       </div>
    </div>
  )
}

export default TimeLineSection;
