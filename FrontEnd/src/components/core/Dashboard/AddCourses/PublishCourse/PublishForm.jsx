import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import {resetCourseState, setSteps} from "../../../../../Slices/CourseSlice";
import {useNavigate} from "react-router-dom";
import { editCourseDetails } from '../../../../../Services/operations/CourseDetailsApi';

const PublishForm = () => {

  const {register, handleSubmit, setValue, getValues} = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);

  const goBack = () => {
    dispatch(setSteps(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }

  const submitForm = async() => {
    if(course?.status === "Published" && getValues("public") === true || 
      (course?.status === "Draft" && getValues("public") === false)){
        goToCourses();
        return;
    }

    //if form is update
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? "Published" : "Draft";
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if(result){
      goToCourses();
    }
    
    setLoading(false);
  }

  useEffect(() => {
    if(course?.status === "Published"){
      setValue("public", true);
    }
  },[])

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <h1 className='text-xl font-semibold'>Publish Course</h1>
         <form onSubmit={handleSubmit(submitForm)}>
            <div className='flex gap-x-2 mt-2 items-center'>
               <input className='rounded h-4 w-4'
               type="checkbox" 
               name="public" 
               id="publish"
               {...register("public")} />
               <label htmlFor="publish">Make This Course as Public</label>
            </div>

            <div className='flex justify-end gap-x-3 mt-9'>
              <button className='flex items-center rounded-md transition-all duration-300 hover:scale-105 active:scale-100 bg-richblack-500 font-semibold px-5 py-2'
              disabled = {loading} 
              type="button"
              onClick={goBack}>
                Back
              </button>

              <button className='flex items-center rounded-md bg-yellow-100 font-semibold text-black px-5 py-2 transition-all duration-300 hover:scale-105 active:scale-100'
              disabled = {loading}
              >
                Save Changes
              </button>
            </div>
        </form>
    </div>
  )
}

export default PublishForm
