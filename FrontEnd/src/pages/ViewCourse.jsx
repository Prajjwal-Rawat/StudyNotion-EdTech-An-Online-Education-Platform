import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseDetails } from "../Services/operations/CourseDetailsApi"
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Slices/ViewCourseSlice";
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { Outlet } from 'react-router-dom';

const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setloading] = useState()


  useEffect(() => {
    const getCourseSpecificDetails = async () => {
      const courseData = await getAllCourseDetails(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.CourseContent))
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.CourseContent?.forEach((sec) => {
        lectures += sec.SubSection.length;
      })
      dispatch(setTotalNoOfLectures(lectures));
    }

    getCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSideBar setReviewModal={setReviewModal} />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className='mx-6'>
            <Outlet />
          </div>
        </div>

      </div>

      {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
      }
    </>
  )
}

export default ViewCourse
