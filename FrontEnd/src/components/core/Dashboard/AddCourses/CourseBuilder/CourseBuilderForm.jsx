import React, { useState } from 'react'
import {useForm} from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux"
import { MdOutlineNavigateNext } from "react-icons/md";
import { setSteps, setEditCourse, setCourse } from '../../../../../Slices/CourseSlice';
import {toast} from "react-hot-toast";
import { createSectionDetails, updateSection } from '../../../../../Services/operations/CourseDetailsApi';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, formState:{errors}, setValue} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const {token} = useSelector((state) => state.auth);

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("SectionTitle")
  }

  const goBack = () => {
    dispatch(setSteps(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.CourseContent.length === 0){
      toast.error("Please Add Atleast one section");
      return
    }

    if(course.CourseContent.some((section) => section.SubSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setSteps(3));
  }

  const submitForm = async(data) => {
      setLoading(true);
      let result;

      if(editSectionName){
        result = await updateSection(
        {
          SectionTitle: data.SectionTitle,
          sectionId: editSectionName,
          courseId: course._id
        }, token
      )
    }else{
      result = await createSectionDetails(
        {
          SectionTitle: data.SectionTitle,
          courseId: course._id
        },token
      )
    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("SectionTitle", "");
    }

    setLoading(false);
  }



  const handleChangeEditSectionName = (sectionId, SectionTitle) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("SectionTitle", SectionTitle);
  }

  return (
    <div className=''>
       <p className='text-xl font-semibold'>Course Builder</p>

       <form onSubmit={handleSubmit(submitForm)} className='mt-3'>
         <div>
           <label htmlFor="sectionName" className='relative w-full text-[0.875rem] text-slate-100'>Section Name <sup className='text-red-200'>*</sup> </label>
           <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] px-8 border-b-2 border-richblack-100"
           type="text" 
           name="SectionTitle" 
           id="sectionName"
           placeholder='Add Section Name'
           {...register("SectionTitle", {required:true})}
           />

           {
            errors.SectionTitle && (
              <span className='text-red-200'>Section Name Is Required</span>
            )
           }
         </div>

         <div className='mt-5 flex gap-2 items-end'>
           <button type="submit" className='text-yellow-100 border border-yellow-100 px-8 rounded-md border-dotted py-2'>
              {
                editSectionName ? <span className='flex items-center gap-2'> Edit Section Name <CiEdit /> </span> : <span className='flex items-center gap-2'> Create Section <IoIosAddCircleOutline /> </span>
              }
           </button>
           {
            editSectionName && (
              <button className='text-sm text-richblack-300 underline ml-2' 
              type="button"
              onClick={cancelEdit}>
                Cancel Edit
              </button>
            )
           }
         </div>
       </form>

       {
        course.CourseContent.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
        )
       }

      <div className='flex items-center justify-end mt-4 gap-x-3 font-semibold'>
         <button className='bg-richblack-500 px-7 hover:scale-105 active:scale-100 transition-all duration-300 rounded-md py-2'
         onClick={goBack}>
          Back
         </button>

         <button className='flex items-center gap-x-1 hover:scale-105 active:scale-100 transition-all duration-300 text-black bg-yellow-200 px-7 rounded-md py-2'
         onClick={goToNext}>
          Next <MdOutlineNavigateNext  className='text-black' size={20}/>
         </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm
