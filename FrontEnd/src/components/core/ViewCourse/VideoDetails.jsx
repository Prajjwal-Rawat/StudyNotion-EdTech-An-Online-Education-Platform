import React, { useEffect, useRef, useState } from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updatedCompletedLectures} from "../../../Slices/ViewCourseSlice";
import { Player } from 'video-react';
import {markLectureAsComplete} from "../../../Services/operations/viewCourseApis";
import 'video-react/dist/video-react.css'; 

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.SubSection.findIndex(
      (subSec) => subSec._id === subSectionId
    );

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }else{
      return false;
    }
  }

  const isLastvideo = () => {

    const currentSectionIndex = courseSectionData?.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.SubSection.findIndex(
      (subSec) => subSec._id === subSectionId
    );

    const noOfSubSections = courseSectionData[currentSectionIndex].SubSection.length;

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections -1){
      return true;
    }else{
      return false;
    }

  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (sec) => sec._id === sectionId
    );
    const noOfSubSections = courseSectionData[currentSectionIndex].SubSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex(
      (subSec) => subSec._id === subSectionId
    );

    if(currentSubSectionIndex !== noOfSubSections - 1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].SubSection[currentSubSectionIndex + 1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }else{
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].SubSection[0]._id;
      
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((subSec) => subSec._id === subSectionId);

    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].SubSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }else{
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const noOfSubSections = courseSectionData[currentSectionIndex - 1].SubSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].SubSection[noOfSubSections - 1]._id;

      navigate(`view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleRewatch = () => {
    if(playerRef?.current){
      playerRef.current.seek(0);
      setVideoEnded(false);
    }
  }

  const handleLectureCompletion = async() => {
      setLoading(true);

      const result = await markLectureAsComplete({
        courseId: courseId,
        subSectionId: subSectionId
      }, token);

      if(result){
        dispatch(updatedCompletedLectures(subSectionId));
      }
      setLoading(false);
  }

  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      if(!courseSectionData.length)
        return;
      if(!courseId || !sectionId || !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }else{
        const filterSec = courseSectionData.filter((sec) => sec._id === sectionId);
        const filterVideoData = filterSec?.[0].SubSection.filter((subSec) => subSec._id === subSectionId);

        setVideoData(filterVideoData[0]);
        setVideoEnded(false); 
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ? (
          <div>No Data Found</div>
        )
        :
        (
          <div>
              <Player
              ref={playerRef}
              aspectRatio='16:9'
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.VideoUrl}
              >

              {
                videoEnded && (

                  <div className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}>
                    {
                      !completedLectures.includes(subSectionId) && (
                        <button className='font-semibold max-w-max px-4 mx-auto bg-yellow-50 py-2 rounded-md text-richblack-700 hover:shadow-md  hover:shadow-black hover:scale-105 active:scale-100 active:shadow-none transition-all duration-300'
                        onClick={() => handleLectureCompletion()}
                        disabled = {loading}>
                          {!loading ? " Mark As Complete" : "Loading..."}
                        </button>
                      )
                    }

                    <button className='mt-4 bg-richblack-800 py-2 px-4 shadow-sm shadow-black hover:scale-105 active:scale-100 active:shadow-none transition-all duration-300 rounded-md'
                    onClick={() => handleRewatch()}>
                      Rewatch
                    </button>

                    <div className='mt-6 flex justify-between'>
                      {
                        !isFirstVideo() && (
                          <button className='hover:text-richblack-200'
                          disabled = {loading}
                          onClick={goToPreviousVideo}>
                            Prev
                          </button>
                        )
                      }

                      {
                        !isLastvideo() && (
                          <button className='hover:text-green-300'
                          disabled = {loading}
                          onClick={goToNextVideo}>
                            Next
                          </button>
                        )
                      }
                    </div>
                  </div>

                )
              }  
              </Player>

              <div className='flex flex-col gap-2 mt-3 text-sm'>
                <h1>Title: <span className='text-richblack-300'>{videoData?.Title}</span></h1>
                <p>Description: <span className='text-richblack-300'>{videoData?.Description}</span></p>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default VideoDetails
