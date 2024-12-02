import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import HButtons from '../components/core/HomePage/HButtons';
import HomeVideo from "../assets/Images/HomeVideo.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import HomeCards from '../components/core/HomePage/HomeCards';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import { ScrollPage, Animator, batch, Fade, Sticky, MoveOut, ZoomInScrollOut, FadeUp, MoveIn } from 'react-scroll-motion';
import Tabs from '../components/core/HomePage/Tabs';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
    return (
        <div>
            {/* section 1 */}

            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
                
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex items-center gap-2 rounded-full py-[5px] px-10 transition-all duration-200 shadow-sm shadow-richblack-5 group-hover:bg-richblack-900 hover:shadow-none'>
                            <p>Become an Instructor</p>
                            <FaArrowRightLong />
                        </div>
                    </div>
                </Link>

                <div className=' slider text-center text-4xl font-semibold mt-7 '>
                    Empower Your Future With <HighlightText text={"Coding Skills"} />
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace,from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructor
                </div>

                <div className='flex gap-7 mt-8'>
                    <HButtons active={true} linkto={"/signup"}>
                        Learn More
                    </HButtons>
                    <HButtons active={false} linkto={"/login"}>
                        Book a Demo
                    </HButtons>
                </div>

                <div className='mx-3 my-12 hover:shadow-custom hover:animate-pulse transition-all duration-700'>
                    <video loop muted autoPlay>
                        <source src={HomeVideo} type='video/mp4' />
                    </video>
                </div>

                <div>

                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={<div className='text-4xl font-semibold'>
                            Unlock Your <HighlightText text={"Coding Potential"} /> With Our Online Courses
                        </div>}
                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        Hbtn1={
                            {
                                active: true,
                                linkto: "/signup",
                                btnText: "Try it Yourself"
                            }
                        }
                        Hbtn2={
                            {
                                active: false,
                                linkto: "/login",
                                btnText: "Learn More"
                            }
                        }
                        codeBlock={`<!doctype html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8" />
                                    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>Vite + React</title>
                                    </head>
                                    <body>`} 
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"bg-shiny-yellow-gradient"}/>
                     
                </div>

                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={<div className='text-4xl font-semibold'>
                            Start <HighlightText text={"Coding In"} /> Seconds
                        </div>}
                        subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        Hbtn1={
                            {
                                active: true,
                                linkto: "/login",
                                btnText: "Continue Lessons"
                            }
                        }
                        Hbtn2={
                            {
                                active: false,
                                linkto: "/signup",
                                btnText: "Learn More"
                            }
                        }
                        codeBlock={`<!doctype html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8" />
                                    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>Vite + React</title>
                                    </head>
                                    <body>`} 
                        codeColor={"text-pink-200"}
                        backgroundGradient={"bg-shiny-blue-gradient"}/>
                </div>

                <Tabs/>

            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='bg_home '>

                   <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>
                        
                        <div className='h-[150px]'></div>

                        <div className='flex flex-row gap-7 mt-10 text-white'>
                             <HButtons active={true} linkto={"/signup"}>
                             <div className='flex gap-2 items-center'>
                                Explore Full Catalog
                                <FaArrowRightLong/>
                             </div>
                             </HButtons>
                             <HButtons active={false} linkto={"/signup"}>
                             <div>
                                Learn More
                             </div>
                             </HButtons>
                        </div>
                   </div>
                </div>

                <div className='mx-auto w-11/12 gap-7 max-w-maxContent flex flex-col items-center justify-between'>
                    <div className='flex flex-row mt-[90px] justify-between'>

                        <div className='text-4xl text-richblack-100 font-semibold w-[45%] '>
                            Get The Skills You Need For A
                            <HighlightText text={" Job That Is In Demand"}/>
                        </div>
                        
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                             <div className='text-[16px] text-richblack-500'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist require more than professional skills.
                             </div>
                             <HButtons active={true} linkto={"/signup"}>
                                Learn More
                             </HButtons>
                        </div>
                    </div>
                    
                     <TimeLineSection/>
                     <HomeCards />
                </div>
            </div>

             {/* section 3 */}
             <div className='flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-between bg-richblack-900 text-white'>
                 <InstructorSection/>

                 <h2 className='text-2xl font-semibold mt-12'>Review From Other Learners</h2>
                 <ReviewSlider/>
             </div>
             <Footer/>
        </div>
    )
}

export default Home
