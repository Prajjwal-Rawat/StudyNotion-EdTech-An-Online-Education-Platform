import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../Slices/CourseSlice';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ThumbnailUploader from "../CourseForm/ThumbnailUploader";
import { updateSubSection, createSubSection } from '../../../../../Services/operations/CourseDetailsApi';


const SubSectionModal = ({modalData, setModalData, add = false, view = false, edit = false}) => {

  const {register, handleSubmit, setValue, formState:{errors}, getValues} = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);


  const isFormUpdated = () => {
    const currentvalues = getValues();

    if(currentvalues.lectureTitle !== modalData.Title||
      currentvalues.lectureDesc !== modalData.Description||
      currentvalues.lectureVideo !== modalData.VideoUrl)
    {
      return true;

    }else {
      return false;
    }
  }

  const handleEditSubSection = async() => {
      const currentvalues = getValues();
      const formData = new FormData();

      formData.append("subSectionId", modalData._id);
      formData.append("sectionId", modalData.sectionId)

      if(currentvalues.lectureTitle !== modalData.Title){
        formData.append("Title", currentvalues.lectureTitle);
      }

      if(currentvalues.lectureDesc !== modalData.Description){
        formData.append("Description", currentvalues.lectureDesc);
      }

      if(currentvalues.lectureVideo !== modalData.VideoUrl){
        formData.append("videoFile", currentvalues.lectureVideo);
      }

      setLoading(true);

      const result = await updateSubSection(formData, token);
      if(result){
        
        const updateCourseContent = course.CourseContent.map((section) => section._id === modalData.sectionId ? result : section);

        const updatedCourse = {...course, CourseContent: updateCourseContent}

        dispatch(setCourse(updatedCourse));
      }

      setModalData(null);
      setLoading(false);
  }


  const formSubmit = async(data) => {
    if(view)
      return;

    if(edit){

      if(!isFormUpdated()){
        toast.error("No Changes made to the form");
      }else{
         handleEditSubSection();
      }
      return;
    }


    //add sub section
    const formData = new FormData();

    formData.append("sectionId", modalData);
    formData.append("Title", data.lectureTitle);
    formData.append("Description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);

    setLoading(true);

    const result = await createSubSection(formData, token);

    if(result){
      
      const updateCourseContent = course.CourseContent.map((section) => section._id === modalData ? result : section);

      const updatedCourseDetail = {...course, CourseContent: updateCourseContent}
      dispatch(setCourse(updatedCourseDetail));
    }

    setModalData(null);
    setLoading(false);
  }

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.Title);
      setValue("lectureDesc", modalData.Description);
      setValue("lectureVideo", modalData.VideoUrl);
    }
  },[]);


  return (
    <div  className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button 
          onClick={() => {!loading ? setModalData(null): {}}}>
          <IoMdCloseCircleOutline className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-8 px-8 py-10">
           <ThumbnailUploader
           name="lectureVideo"
           label="Lecture Video"
           register={register}
           setValue={setValue}
           errors={errors}
           video = {true}
           viewData={view ? modalData.VideoUrl : null}
           editData={edit ? modalData.VideoUrl : null}
           />

           <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-sm text-richblack-5">Lecture Title {!view && <sup className="text-red-200">*</sup>}</label>
            <input className="bg-richblack-600 font-style rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
            type="text" 
            name="lectureTitle" 
            id="title"
            placeholder='Enter Lecture Title'
            {...register("lectureTitle", {required:true})} 
            />

            {
              errors.lectureTitle && (
                <span className='text-red-200'>Lecture Title is Required</span>
              )
            }
           </div>

           <div className="flex flex-col space-y-2">
             <label htmlFor="description" className="text-sm text-richblack-5">Lecture Description {!view && <sup className="text-pink-200">*</sup>}</label>
             <textarea className="bg-richblack-600 form-style resize-x-none min-h-[130px] rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
             name='lectureDesc'
             id='description'
             placeholder='Enter Lecture Description'
             {...register("lectureDesc", {required:true})}
             />

             {
              errors.lectureDesc && (
                <span className='text-red-200'>Lecture Description is required</span>
              )
             }
           </div>

           {
            !view && (
              <div className="flex justify-end">
                <button className='bg-yellow-100 px-5 py-2 transition-all duration-300 hover:scale-105 active:scale-100 rounded-md text-richblack-800 font-semibold'
                type="submit">
                  {edit ? "Save Changes" : "Save"}
                </button>
              </div>
            )
           }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
