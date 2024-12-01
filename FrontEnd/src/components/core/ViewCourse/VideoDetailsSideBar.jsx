import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";

const VideoDetailsSideBar = ({ setReviewModal }) => {

  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length)
        return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.
        findIndex((data) => data._id === subSectionId);

      const activeSubSectionId = courseSectionData[currentSectionIndex]?.SubSection[currentSubSectionIndex]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    })()

  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <button className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors duration-200"
              onClick={() => navigate("/dashboard/enrolled-courses")}>
              <IoArrowBackCircleOutline size={30} />
              <span className="text-lg font-medium">Back</span>
            </button>

            <button className="px-4 flex items-center gap-x-2 py-2 bg-pink-800 text-white rounded-lg shadow-md hover:bg-blue-200 transition-transform transform hover:scale-105"
              onClick={() => setReviewModal(true)}>
              <MdOutlineRateReview /> Add Review
            </button>
          </div>

          <div className="flex flex-col mt-4">
            <p>{courseEntireData?.CourseName}</p>
            <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length}/ {totalNoOfLectures}</p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {
            courseSectionData.map((sec, index) => (
              <div key={index} className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={() => setActiveStatus(sec._id)}
              >
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {sec.SectionTitle}
                  </div>
                    <IoIosArrowDropdown size={17}/>
                </div>

                <div>
                  {
                    activeStatus === sec?._id && (
                      <div className="transition-[height] duration-500 ease-in-out">
                        {
                          sec.SubSection.map((subSec, index) => (
                            <div key={index} className={`${videoBarActive === subSec._id ? "bg-yellow-50 text-richblack-800" : "bg-richblack-800 text-white"} flex gap-4 p-5`}
                            onClick={() => {
                              navigate(`/view-course/${courseEntireData?._id}/section/${sec._id}/sub-section/${subSec._id}`)
                              setVideoBarActive(subSec?._id)
                            }}>
                              <input 
                              type="checkbox" 
                              checked = {completedLectures.includes(subSec?._id)}
                              onChange={() => {}} 
                              id="lecture" />
                              <span>{subSec.Title}</span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default VideoDetailsSideBar
