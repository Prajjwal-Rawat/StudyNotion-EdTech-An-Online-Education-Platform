import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { fetchInstructorCourses } from "../../../../Services/operations/CourseDetailsApi";
import { getInstructorDetails } from '../../../../Services/operations/instructorApis';
import InstructorChart from './InstructorChart';

const InstructorDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [instructorStats, setInstructorStats] = useState([]);
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.Profile);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchInstructorStats = async () => {
            const res = await getInstructorDetails(token);
            const result = await fetchInstructorCourses(token);

            if (res.length) {
                setInstructorStats(res);
            }
            if (result) {
                setCourses(result.instructorCourses);
            }

            setLoading(false);
        }
        fetchInstructorStats();
    }, []);

    const totalAmount = instructorStats.reduce((total, curr) => total + curr.totalAmount, 0);
    const totalEnrolledStudents = instructorStats.reduce((total, curr) => total + curr.totalStudentEnrolled, 0);


    return (
        <div className='text-white'>
            <div>
                <h1 className='text-xl'>Hi <span className='text-blue-200 font-semibold'>{user.FirstName} {user.LastName}</span> 👋</h1>
                <p className='text-richblack-400'>Let's Start Something New</p>
            </div>

            {
                loading ? (
                    <div className='flex flex-col items-center justify-center mt-[20%]'>
                       <div className='spinner'></div>
                       <div className='mt-10'>Loading...</div>
                    </div>
                ) : courses.length > 0 ? (
                    <div>
                        <div className='flex mt-2 gap-x-2'>
                            <div className='w-[70%]'>
                                <InstructorChart courses={courses} />
                            </div>
                            <div className="flex min-w-[250px] max-h-[390px] flex-col rounded-md gap-y-10 text-lg bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                                <div>
                                    <p className='font-semibold'>Total Courses</p>
                                    <p className='text-richblack-50 text-3xl'>{courses.length}</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Total Student</p>
                                    <p className='text-richblack-50 text-3xl'>{totalEnrolledStudents}</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Total Income</p>
                                    <p className='text-richblack-50 text-3xl'>Rs. {totalAmount}</p>
                                </div>
                            </div>
                        </div>

                       {/* courses */}
                        <div className="rounded-md bg-richblack-800 p-6 mt-4">
                            <div className="flex items-center justify-between  p-2">
                                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                                <button className="text-xs font-semibold text-yellow-50"
                                onClick={() => navigate("/dashboard/my-courses")}>
                                    View All
                                </button>
                            </div>

                            <div className='flex gap-x-3 mt-2'>
                                {
                                    courses.slice(0,3).map((course, index) => (
                                        <div className='w-[110px] lg:w-full'>
                                            <img src={course.Thumbnail} alt="thumbnail"
                                            className="lg:h-[201px] lg:w-[300px] rounded-md object-cover" />
                                            <div className='mt-1'>
                                                <p className='font-semibold'>{course.CourseName}</p>
                                                <div className='lg:flex gap-x-1 mt-1 text-richblack-300'>
                                                    <p>{course.StudentEnrolled.length} students</p>
                                                    <p>|</p>
                                                    <p>Rs.{course.Price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center mt-[20%]'>
                        <p className='font-semibold'>You Have Not Created Any Course Yet</p>
                        <Link to={"/dashboard/add-course"} 
                        className='bg-yellow-50 px-4 py-2 rounded-md mt-2 text-richblack-900 font-semibold hover:scale-105 hover:shadow-md
                         hover:shadow-richblack-600 active:shadow-none active:scale-100 transition-all duration-300'
                        >
                        Create A Course
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default InstructorDashboard
