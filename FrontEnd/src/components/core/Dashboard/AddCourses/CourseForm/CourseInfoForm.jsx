import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories } from '../../../../../Services/operations/CourseDetailsApi';
import { FaIndianRupeeSign } from "react-icons/fa6";
import InstructionField from './InstructionField';
import TagsInput from './TagsInput';
import ThumbnailUploader from './ThumbnailUploader';
import { setCourse, setSteps } from '../../../../../Slices/CourseSlice';
import toast from 'react-hot-toast';
import { editCourseDetails } from '../../../../../Services/operations/CourseDetailsApi';


const CourseInfoForm = () => {

    const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();

    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);



    const getCategories = async() => {
     setLoading(true);
     const categories = await fetchCourseCategories();

     if(categories.length > 0){
         setCourseCategories(categories);
     }
     setLoading(false);
    }


    const isFormUpdated = () => {
        const currentValues = getValues();

        if( currentValues.CourseTitle !== course.CourseName ||
            currentValues.CourseDesc !== course.CourseDescription ||
            currentValues.CoursePrice !== course.Price ||
            currentValues.CourseTags.toString() !== course.Tags.toString() ||
            currentValues.CourseBenefits !== course.WhatYouWillLearn ||
            currentValues.CourseCategory !== course.Category ||
            currentValues.CourseRequirements.toString() !== course.instructions.toString() ||
            currentValues.CourseImage !== course.Thumbnail ||
            currentValues.CourseLanguage !== course.Language)
            {
            return true
        }else{
            return false
        }
    }


    const SubmitForm = async(data) => {
        console.log("data is ", data);
        if(editCourse){
            
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id)

                if(currentValues.CourseTitle !== course.CourseName){
                    formData.append("CourseName", data.CourseTitle)
                }

                if(currentValues.CourseDesc !== course.CourseDescription){
                    formData.append("CourseDescription", data.CourseDesc)
                }

                if(currentValues.CoursePrice !== course.Price){
                    formData.append("Price", data.CoursePrice)
                }

                if(currentValues.CourseTags.toString() !== course.Tags.toString()){
                    formData.append("Tags", JSON.stringify(data.CourseTags))
                }

                if(currentValues.CourseBenefits !== course.WhatYouWillLearn){
                    formData.append("WhatYouWillLearn", data.CourseBenefits)
                }

                if( currentValues.CourseCategory !== course.Category){
                    formData.append("Category", data.CourseCategory)
                }

                if(currentValues.CourseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.CourseRequirements))
                }

                if(currentValues.CourseImage !== course.Thumbnail){
                    formData.append("thumbnailImage", data.CourseImage)
                }

                if(currentValues.CourseLanguage !== course.Language){
                    formData.append("Language", data.CourseLanguage)
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setSteps(2));
                    dispatch(setCourse(result))
                }
            }else{
                toast.error("No Changes made so far");
            }
            return;
        }

        //create new course
        const formData = new FormData();
        formData.append("CourseName", data.CourseTitle);
        formData.append("CourseDescription", data.CourseDesc);
        formData.append("Price", data.CoursePrice);
        formData.append("Tags", JSON.stringify(data.CourseTags));
        formData.append("WhatYouWillLearn", data.CourseBenefits);
        formData.append("Category", data.CourseCategory);
        formData.append("instructions", JSON.stringify(data.CourseRequirements));
        formData.append("thumbnailImage", data.CourseImage);
        formData.append("Language", data.CourseLanguage);
        formData.append("status", "Draft");

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            dispatch(setSteps(2));
            dispatch(setCourse(result));
        }
        setLoading(false);

    }


    useEffect(() => {

        if(editCourse){
            setValue("CourseTitle", course.CourseName)
            setValue("CourseDesc", course.CourseDescription)
            setValue("CoursePrice", course.Price)
            setValue("CourseTags", course.Tags)
            setValue("CourseBenefits", course.WhatYouWillLearn)
            setValue("CourseCategory", course.Category)
            setValue("CourseRequirements", course.instructions)
            setValue("CourseImage", course.Thumbnail)
            setValue("CourseLanguage", course.Language)
        }
        getCategories();
    }, [])

  return (
    <form onSubmit={handleSubmit(SubmitForm)}
    className='rounded-md border-richblack-700 bg-blue-700 p-7 space-y-8'>
        
        <div>
            <label htmlFor="courseTitle" className='w-full text-[0.875rem] text-slate-100'>Course Title <sup className='text-red-200'>*</sup>
                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                type="text" 
                name="CourseTitle"
                placeholder='Enter Course Title' 
                id="courseTitle" 
                {...register("CourseTitle", {required:true})}
                />

                {
                    errors.CourseTitle && (
                        <span className='text-red-200'>Course Title is required</span>
                    )
                }
            </label>
        </div>

        <div>
            <label htmlFor="courseDes" className='w-full text-[0.875rem] text-slate-100'>Course Short Description <sup className='text-red-200'>*</sup>
                <textarea className="bg-richblack-800 min-h-[140px] rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                name="CourseDesc" 
                id="courseDes"
                placeholder='Enter Course Description'
                {...register("CourseDesc", {required:true})}
                />

                {
                    errors.CourseDesc && (
                        <span className='text-red-200'>Course Description is required</span>
                    )
                }
            </label>
        </div>

        <div>
            <label htmlFor="coursePrice" className='relative w-full text-[0.875rem] text-slate-100'>Course Price <sup className='text-red-200'>*</sup> 
                <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] px-8 border-b-2 border-richblack-100"
                type="number" 
                name="CoursePrice" 
                id="coursePrice"
                placeholder='Enter the Price'
                {...register("CoursePrice", {required:true})}
                />
                <FaIndianRupeeSign className=' absolute top-[37px] left-2' size={20}/>

                {
                    errors.CoursePrice && (
                        <span className='text-red-200'>Course Price is required</span>
                    )
                }
            </label>
        </div>

        <div>
            <label htmlFor="category" className='w-full text-[0.875rem] text-slate-100'>Course Category <sup className='text-red-200'>*</sup> 
               <select className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
               name="CourseCategory" 
               id="category"
               defaultValue= ""
               {...register("CourseCategory", {required:true})}
               >
                  
                  <option value="" disabled>Choose a Category</option>
                  {
                    !loading && courseCategories.map((cate, index) => (
                        <option key={index} value={cate?._id}>
                            {cate?.Category}
                        </option>
                    ))
                  }
               </select>

               {
                errors.CourseCategory && (
                    <span className='text-red-200'>Course Category is required</span>
                )
               }
            </label>
        </div>

        <div>
            <label htmlFor="language" className='w-full text-[0.875rem] text-slate-100'>Course Language <sup className='text-red-200'>*</sup> 
               <select className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
               name="CourseLanguage" 
               id="language"
               defaultValue=""
               {...register("CourseLanguage", {required:true})}
               >
                  
                  <option value="" disabled>Select Course Language</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="English/Hindi">English/Hindi</option>
               </select>

               {
                errors.CourseLanguage && (
                    <span className='text-red-200'>Language is required</span>
                )
               }
            </label>
        </div>

        <TagsInput
        name = "CourseTags"
        label = "Tags"
        register={register}
        errors = {errors}
        setValue = {setValue}
        />

        <ThumbnailUploader
         name="CourseImage"
         label="Course Thumbnail"
         register={register}
         setValue={setValue}
         errors={errors}
         editData={editCourse ? course?.Thumbnail : null}
        />
  
        <div>
            <label htmlFor="benefits" className='w-full text-[0.875rem] text-slate-100'>Benefits Of Course <sup className='text-red-200'>*</sup>
                <textarea className="bg-richblack-800 min-h-[140px] rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
                name="CourseBenefits" 
                id="benefits"
                placeholder='Enter Course Benefits'
                {...register("CourseBenefits", {required:true})}
                />

                {
                    errors.CourseBenefits && (
                        <span className='text-red-200'>Benefits Of course is required</span>
                    )
                }
            </label>
        </div>

        <InstructionField
        name = "CourseRequirements"
        label = "Requirements/Instructions"
        register = {register}
        setValue = {setValue}
        errors = {errors}
        getValues = {getValues} 
        />

        <div className='flex justify-end gap-x-3'>

            {
             editCourse && (
                <button  className='bg-richblack-500 rounded-md font-semibold text-black px-5 py-2'
                onClick={() => dispatch(setSteps(2))}
                >
                    Continue Without Saving
                </button>
             )
            }

            <button className='bg-yellow-100 rounded-md font-semibold text-black px-5 py-2' 
            >
                {!editCourse ? "Next" : "Save Changes"}
            </button>
    
        </div>
    </form>
  )
}

export default CourseInfoForm
