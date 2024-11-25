import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Td, Th, Tr } from "react-super-responsive-table";
import { TbClockHour8 } from "react-icons/tb";
import { MdPublishedWithChanges } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../common/Modal";
import ClickOutSide from "../../../Hooks/ClickOutSide"
import { deleteCourse } from '../../../../Services/operations/CourseDetailsApi';
import { fetchInstructorCourses } from '../../../../Services/operations/CourseDetailsApi';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import {formatDate} from "../../../../Services/formatDate"

const CoursesTable = ({ courses, setCourses }) => {


    const [loading, setLoading] = useState(false);
    const [showmodal, setShowModal] = useState(null);

    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalRef = useRef();

    ClickOutSide(modalRef, () => setShowModal(null));

    const handleDeleteCourse = async(courseId) => {
       setLoading(true);
        
       await deleteCourse({courseId: courseId}, token);

       const result = await fetchInstructorCourses(token);
       if(result){
           setCourses(result);
       }
       setLoading(false);
       setShowModal(null);
    }
    
    return (
        <div>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                   
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                   
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                    
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (
                            courses.map((course) => (
                                <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                    <Td className="flex flex-1 gap-x-4">
                                        <img src={course.Thumbnail} className='h-[150px] w-[220px] rounded-lg object-cover' />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg font-semibold text-richblack-5">{course.CourseName}</p>
                                            <p className="text-xs text-richblack-300">{course.CourseDescription}</p>
                                            <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}</p>

                                            {
                                                course.status === "Draft" ? (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100"><TbClockHour8 size={14} /> Drafted</p>
                                                ) : (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100"><MdPublishedWithChanges size={13} /> Published</p>
                                                )
                                            }
                                        </div>
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100">
                                        2hr 30min
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100">
                                       Rs.{course.Price}
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100">
                                        <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}>
                                            <CiEdit size={20} />
                                        </button>

                                        <button  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                            disabled={loading}
                                            onClick={() => setShowModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleDeleteCourse(course._id) : () => {},
                                                btn2Handler: () => setShowModal(null)
                                            })}>
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>

            {
                showmodal && <Modal modalData = {showmodal} ref={modalRef} />
            }
        </div>
    )
}

export default CoursesTable
