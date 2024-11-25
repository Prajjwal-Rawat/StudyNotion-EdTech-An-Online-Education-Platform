import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../Slices/CourseSlice';
import { getDetailsOfCourse } from '../../../../Services/operations/CourseDetailsApi';
import RenderCourseSteps from '../AddCourses/RenderCourseSteps';

const EditCourse = () => {

    const [loading, setLoading] = useState();

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);


    useEffect(() => {
       const populateCourseDetails = async() => {
        setLoading(true);
        const result = await getDetailsOfCourse(courseId, token);
          if(result){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result));
          }
          setLoading(false);
       }
       populateCourseDetails();
    },[]);

    if(loading){
        return(
            <div>Loading...</div>
        )
    }
  return (
    <div className='text-white'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
            {
                course ? (<RenderCourseSteps/>) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found</p>)
            }
        </div>  
    </div>
  )
}

export default EditCourse
