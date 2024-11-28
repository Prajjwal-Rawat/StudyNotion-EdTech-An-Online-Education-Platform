import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from './CoursesTable';
import { fetchInstructorCourses } from '../../../../Services/operations/CourseDetailsApi';

const MyCourses = () => {

    const [courses, setCourses] = useState([]);
    const [timeDuration, setTimeDuration] = useState({})

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCourses = async() => {
        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result.instructorCourses);
            setTimeDuration(result.timeDurationObj);
        }
      }
      fetchCourses();
    },[])

  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
           <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
           <button className='flex gap-x-2 bg-yellow-100 px-5 py-2 items-center rounded-md'
           onClick={() => navigate("/dashboard/add-course")}>
            Add Course <IoIosAddCircle />
           </button>
        </div>

        {
            courses && <CoursesTable courses = {courses} setCourses = {setCourses} timeDuration = {timeDuration}/>
        }
    </div>
  )
}

export default MyCourses
