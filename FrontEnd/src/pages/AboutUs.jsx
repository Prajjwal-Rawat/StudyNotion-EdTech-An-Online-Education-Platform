import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText";
import aboutImg1 from "../assets/Images/aboutImg1.jpg";
import aboutImg2 from "../assets/Images/aboutImg2.jpg";
import aboutImg3 from "../assets/Images/aboutImg3.jpg";
import Quote from '../components/core/AboutPage/Quote';
import aboutImg4 from "../assets/Images/about4.jpg";
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Footer from '../components/common/Footer';

const AboutUs = () => {
    return (
        <div className='text-white'>
            {/* section 1 */}

            <section className='bg-richblack-600'>
                <div className='relative flex flex-col text-center items-center mx-auto w-11/12 max-w-maxContent'>
                    <h1 className='text-4xl mt-16 font-semibold py-5 w-[60%]'>Driving Innovation in Online Education for a <HighlightText text={"Bright Future"} /> </h1>
                    <p className='mx-auto mt-3 text-center text-base mb-[10rem] font-medium text-richblack-100 lg:w-[75%]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a
                        brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>

                <div className=' absolute flex top-[21rem] right-[17rem] gap-x-10 '>
                    <img src={aboutImg1} width={320} className='shadow-shiny-pink hover:scale-105 transition-all duration-300'/>
                    <img src={aboutImg2} width={320} className='shadow-shiny-yellow hover:scale-105 transition-all duration-300'/>
                    <img src={aboutImg3} width={320} className='shadow-shiny-blue hover:scale-105 transition-all duration-300'/>
                </div>
            </section>

            {/* section 2 */}

            <section>
                <div className="mx-auto flex w-11/12 mt-9 max-w-maxContent flex-col items-center gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}

            <section>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center mt-[9rem] justify-between gap-10 text-richblack-300'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col w-[46%]'>
                            <h1 className='bg-red-love bg-clip-text text-transparent text-4xl font-semibold'>Our Founding Story</h1>
                            <p className='mt-10'> Our e-learning platform was born out of a shared vision and
                                passion for transforming education. It all began with a group of
                                educators, technologists, and lifelong learners who recognized
                                the need for accessible, flexible, and high-quality learning
                                opportunities in a rapidly evolving digital world.
                            </p>
                            <p className='mt-5'> As experienced educators ourselves, we witnessed firsthand the
                                limitations and challenges of traditional education systems. We
                                believed that education should not be confined to the walls of a
                                classroom or restricted by geographical boundaries. We
                                envisioned a platform that could bridge these gaps and empower
                                individuals from all walks of life to unlock their full
                                potential.
                            </p>
                        </div>

                        <div className='w-[40%]'>
                            <img src={aboutImg4} width={420} className='shadow-rainbow' />
                        </div>
                    </div>

                    <div className='flex justify-between mt-[9rem]'>
                        <div className='w-[46%]'>
                            <h1 className='text-4xl font-semibold bg-rainbow bg-clip-text text-transparent'>Our Vision</h1>
                            <p className='mt-4'>With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                        </div>

                        <div className='w-[40%]'>
                            <h1 className='text-4xl font-semibold bg-blue-purple bg-clip-text text-transparent'>Our Mission</h1>
                            <p className='mt-4'> Our mission goes beyond just delivering courses online.
                                We wanted to create a vibrant community of learners,
                                where individuals can connect, collaborate, and learn from one another.
                                We believe that knowledge thrives in an environment of sharing and dialogue,
                                and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <StatsComponent />

            {/* section 5 */}

            <section className='flex flex-col gap-4 mt-10 mx-auto w-11/12 max-w-maxContent'>
                <LearningGrid />
                <ContactFormSection />
            </section>

            <section>
                <div className='flex flex-col items-center mt-10'>
                    <h1 className='text-2xl font-semibold'>Review From other Learners</h1>
                    {/* <ReviewSlider/> */}
                </div>
            </section>

         <Footer/>
        </div>
    )
}

export default AboutUs
