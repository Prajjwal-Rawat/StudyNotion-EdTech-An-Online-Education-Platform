import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../../../../common/Modal"
import ClickOutSide from "../../../../Hooks/ClickOutSide";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../Services/operations/CourseDetailsApi';
import {setCourse} from "../../../../../Slices/CourseSlice";


const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const modalRef = useRef();

  ClickOutSide(modalRef, () => setConfirmationModal(null));


  const handleDeleteSection = async(sectionId) => {
      const result = await deleteSection({
        sectionId: sectionId,
        courseId: course._id,
      }, token);

      if(result){
        dispatch(setCourse(result));
      }
      setConfirmationModal(null);
  }


  const handleDeleteSubSection = async(subSectionId) => {
     const result = await deleteSubSection({
      subSectionId: subSectionId,
      courseId: course._id
     }, token);

     if(result){
      dispatch(setCourse(result));
     }

     setConfirmationModal(null)
  }


  return (
    <div className='mt-7'>
      <div className='rounded-lg bg-richblue-800 p-6 px-8'>
        {
          course?.CourseContent?.map((section) => (
            <details key={section?._id} open>
              <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                <div className='flex items-center gap-x-3'>
                  <RxDropdownMenu className='cursor-pointer' />
                  <p>{section.SectionTitle}</p>
                </div>

                <div className='flex items-center gap-x-3'>
                  <button
                    onClick={() =>  handleChangeEditSectionName(section._id, section.SectionTitle)}>
                    <MdModeEdit />
                  </button>

                  <button
                    onClick={() => setConfirmationModal({
                      text1: "Delete This Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })}>
                    <RiDeleteBin6Line />
                  </button>

                  <span>|</span>
                  <IoMdArrowDropdown className='text-xl text-richblack-300 cursor-pointer' />
                </div>

              </summary>

              <div className='px-6 pb-4'>
                {
                  section.SubSection.map((subSection) => (
                    <div key={subSection._id} className='flex mt-3 items-center justify-between gap-x-3 border-b-2'>

                      <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu />
                        <p onClick={() => setViewSubSection(subSection)} className='cursor-pointer hover:text-richblack-300'>{subSection.Title}</p>
                      </div>

                      <div className='flex items-center gap-x-3'>
                        <button onClick={() => setEditSubSection({ ...subSection, sectionId: section._id })}>
                          <MdModeEdit />
                        </button>

                        <button onClick={() => setConfirmationModal({
                          text1: "Delete This Sub Section",
                          text2: "Selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(subSection._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })}>
                          <RiDeleteBin6Line />
                        </button>

                      </div>
                    </div>
                  ))
                }

                <button className='mt-4 mb-2 flex items-center gap-x-2 text-yellow-100' 
                onClick={() => setAddSubSection(section._id)}>
                <IoIosAddCircleOutline /> Add Lecture
                </button>

              </div>
            </details>
          ))
        }
      </div>

      {
        addSubSection ? (<SubSectionModal modalData = {addSubSection} setModalData = {setAddSubSection} add = {true}/>) 
        : viewSubSection ? (<SubSectionModal modalData = {viewSubSection} setModalData = {setViewSubSection} view = {true}/>) 
        : editSubSection && (<SubSectionModal modalData = {editSubSection} setModalData = {setEditSubSection} edit = {true}/>)
      }

      {
        confirmationModal && (<Modal modalData ={confirmationModal} ref={modalRef}/>)
      }
    </div>
  )
}

export default NestedView
