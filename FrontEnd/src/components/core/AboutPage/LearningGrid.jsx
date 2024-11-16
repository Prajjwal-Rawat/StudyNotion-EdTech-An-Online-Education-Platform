import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import HButtons from '../HomePage/HButtons'

const LearningGriddata = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:"Our learning method combines flexible and practical approaches to ensure a comprehensive and engaging educational experience.",
    },
    {
        order: 3,
        heading: "Certification",
        description:"Studynotion provides industry-recognized certification to validate your new skills and enhance your career prospects.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:"Studynotion’s auto-grading feature provides instant, objective feedback to help learners assess their understanding and progress efficiently.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:"Studynotion equips learners with job-ready skills, preparing them to excel in the workforce.",
    },
]

const LearningGrid = () => {
    return (
        <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
            {
                LearningGriddata.map((card, index) => {
                    return(
                        <div key={index} className={`${index === 0 && "lg:col-span-2 lg:h-[270px] p-5"} ${card.order % 2 === 1 ? "bg-richblack-600 p-5 lg:h-[270px]" : "bg-richblack-900 p-5"} ${card.order === 3 && "lg:col-start-2"}`}>
                            {
                                index === 0 ? (
                                    <div className='lg:w-[90%] flex flex-col gap-3 pb-5'>
                                        <h1 className='text-4xl font-semibold'>{card.heading} <HighlightText text={card.highlightText}/></h1>
                                        <p className='font-medium'>{card.description}</p>
                                        <div className='w-fit'>
                                           <HButtons active={true} linkto={card.BtnLink}>
                                            {card.BtnText}
                                           </HButtons>
                                        </div>
                                    </div>
                                ):(
                                    <div className='flex flex-col gap-5 w-[200px] p-1'>
                                        <h1 className='text-richblack-5 text-lg'>{card.heading}</h1>
                                        <p className='text-richblack-200'>{card.description}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }

        </div>
    )
}

export default LearningGrid
