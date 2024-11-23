import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import { getUserEnrolledCourses } from '../../../../Services/operations/getUserProfileApi';
import ProgressBar from "@ramonak/react-progress-bar"
import ClipLoader from "react-spinners/ClipLoader";

const EnrollCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try{
           const response = await getUserEnrolledCourses(token);
           setEnrolledCourses(response);
        }catch(err){
            console.log("Unable to get Enrolled Courses", err);
        }
    }
    useEffect(() => {
       getEnrolledCourses();
    }, [])
  return (
    <div className='text-white'>
        <div>Enroll Courses</div>

        {
            !enrolledCourses ? (
                <div className='mx-auto flex justify-center items-center'>
                    <ClipLoader 
                    color="blue"
                    size={150}
                    aria-label='Loading...'/>
                </div>
            )
            : !enrolledCourses.length ? (
                <p>You Have not enrolled in any course yet</p>
            ): (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>

                    {
                        enrolledCourses.map((course, index) => (
                            <div key={index}>
                                <div>
                                    <img src= {course.Thumbnail} />
                                    <div>
                                        <p>{course.CourseName}</p>
                                        <p>{course.CourseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course.TimeDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false} />
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrollCourses
