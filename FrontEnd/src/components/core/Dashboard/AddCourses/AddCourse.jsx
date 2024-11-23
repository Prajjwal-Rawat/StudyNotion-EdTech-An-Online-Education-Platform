import React from 'react'
import RenderCourseSteps from './RenderCourseSteps'

const AddCourse = () => {
  return (
    <>
      <div className="text-white w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 p-6 lg:p-2 rounded-lg shadow-md">
         <div className="lg:w-[60%] w-full">
            <h1 className="text-2xl font-bold mb-10 border-b pb-2 border-gray-700">Add Course</h1>
            <RenderCourseSteps/>
         </div>

         <div className="lg:w-[45%] w-full h-[530px] bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold mb-4">⚡ Course Upload Tips</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Set the course Price option or make it free.</li>
                <li> Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Annoucements to notify any Important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
         </div>
      </div>
    </>
  )
}

export default AddCourse
