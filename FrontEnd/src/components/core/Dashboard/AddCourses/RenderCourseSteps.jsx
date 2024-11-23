import React from 'react'
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa6";
import CourseInfoForm from './CourseForm/CourseInfoForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishForm from './PublishCourse/PublishForm';

const RenderCourseSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish course"
        }
    ]
    return (
        <div>
            <div className='flex flex-col mb-10 '>

                <div className="flex items-center">
                    {steps.map((item) => (
                        <div key={item.id} className='flex items-center ml-8'>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === item.id ? "bg-yellow-900 border border-yellow-100 text-yellow-50" : "bg-richblack-700 border border-richblack-400 text-richblack-200"}`}>
                                {
                                    step > item.id ? (<FaCheck className='bg-yellow-100  rounded-full text-black p-2' size={30} />) : (item.id)
                                }
                            </div>
                            {
                                item.id !== steps.length && <span className={`flex items-center ${step > item.id ? "text-yellow-50" : "text-richblack-300"}`}>------------------------</span>
                            }
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                    {steps.map((item) => (
                        <div key={item.id} className='text-center'>
                            <p
                                className={`text-sm font-medium ${step === item.id
                                        ? "text-yellow-400"
                                        : step > item.id
                                            ? "text-green-400"
                                            : "text-gray-400"
                                    }`}>
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>

            </div>


            {step === 1 && (<CourseInfoForm />)}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishForm/>}
        </div>
    )
}

export default RenderCourseSteps
