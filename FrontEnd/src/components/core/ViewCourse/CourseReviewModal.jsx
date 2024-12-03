import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useForm} from "react-hook-form";
import ReactStars from 'react-stars';
import { createRating } from '../../../Services/operations/viewCourseApis';

const CourseReviewModal = ({ setReviewModal }) => {

  const { user } = useSelector((state) => state.Profile);
  const {token} = useSelector((state) => state.auth);
  const {courseEntireData} = useSelector((state) => state.viewCourse)
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();

  const onSubmitForm = async(data) => {
    await createRating({
      courseId:courseEntireData?._id, 
      Rating: data.courseRating,
      Review: data.courseExperience
    }, token);

    setReviewModal(false);
  }

  const ratingChanged = (newRating) => {
      setValue("courseRating", newRating);
  }

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0);
  },[])

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button className='text-white border rounded-full w-7 hover:text-red-200 text-lg border-richblack-200' 
          onClick={() => setReviewModal(false)}
          >
            x
          </button>
        </div>
      
        <div className="p-6">

          <div className="flex items-center justify-center gap-x-4">
            <img src={user?.UserImageUrl} alt="img" className='aspect-square w-[50px] rounded-full object-cover' />

            <div>
              <p className="font-semibold text-richblack-5">{user?.FirstName} {user?.LastName}</p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmitForm)} className='flex mt-6 flex-col items-center'>
            
            <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2={'#ffd700'}
            />

            <div className="flex w-11/12 flex-col space-y-2">
              <label htmlFor="review" className='relative w-full text-[0.875rem] text-richblack-100'>Add Your Experience <sup className='text-red-200'>*</sup>
                <textarea className="bg-richblack-600 min-h-[140px] rounded-[0.5rem] mt-1 text-white w-full p-[14px] border-b-2 border-richblack-100"
                name="courseExperience" 
                id="review"
                typeof='text'
                placeholder='Give Your Review'
                {...register("courseExperience", {required:true})}
                />

                {
                  errors.courseExperience && (
                    <span className='text-red-200'>Please Add Your Experience</span>
                  )
                }
              </label>
            </div>

            <div className='flex gap-x-10 mt-4'>
              <button type="button" className='bg-richblack-900 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-md hover:shadow-black hover:scale-105 active:shadow-none active:scale-100'
              onClick={() => setReviewModal(false)}>
                Cancel
              </button>
              <button type="submit" className='bg-yellow-50 text-richblack-800 px-4 py-2 rounded-md transition-all duration-300 hover:shadow-md hover:shadow-black hover:scale-105 active:shadow-none active:scale-100'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
