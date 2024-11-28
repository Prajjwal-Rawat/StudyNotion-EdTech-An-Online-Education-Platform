import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from '../Services/operations/studentFunctionalityApis'
import { getDetailsOfCourse } from '../Services/operations/CourseDetailsApi';
import GetAvgRating from "../utils/avgRating";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../components/common/Modal";
import ClickOutSide from "../components/Hooks/ClickOutSide";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../Services/formatDate";
import { GoClock } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import { LuArrowBigRightDash } from "react-icons/lu";
import { CiVideoOn } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import BuyCourseCard from '../components/core/BuyCourse/BuyCourseCard';
import Footer from "../components/common/Footer";

// import { removeFromCart } from '../Slices/CartSlice';

const CourseDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.Profile);
  const { courseId } = useParams();
  const modalRef = useRef();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const [timeDuration, setTimeDuration] = useState("");

  const handleActive = (event,id) => {
    event.preventDefault();
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((index) => index !== id) : [...prev, id]
    );
  };



  ClickOutSide(modalRef, () => showModal(null));


  async function handleBuyCourse() {
    if (token) {
      console.log("course di", courseId);
      await buyCourse([courseId], token, navigate, dispatch, user, true);
      return;
    }

    setShowModal({
      text1: "Your are not Logged In",
      text2: "Please login to Buy Course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setShowModal(null),
    })
  }


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const result = await getDetailsOfCourse(courseId, token);
        if (result) {
          setCourseData(result.courseDetails);
          setTimeDuration(result.totalDuration);
        }
      } catch (err) {
        console.log("error in fetching course details", err);
      }
    }
    fetchCourseData();
  }, [courseId]);


  useEffect(() => {
    const count = GetAvgRating(courseData?.RatingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);


  useEffect(() => {
    let lectures = 0;
    courseData?.CourseContent?.forEach((section) => {
      lectures += section.SubSection.length || 0;
    });
    setTotalNoOfLectures(lectures);

  }, [courseData]);


  if (loading || !courseData) {
    return <div className='mx-auto flex justify-center items-center'>
      <ClipLoader
        color="blue"
        size={150}
        aria-label='Loading...' />
    </div>
  }

  const {
    CourseName,
    CourseDescription,
    Instructor,
    Language,
    WhatYouWillLearn,
    CourseContent,
    RatingAndReviews,
    Price,
    Thumbnail,
    StudentEnrolled,
    createdAt

  } = courseData;

  return (
    <div className='w-full'>

      <img src={Thumbnail} alt="" className=' absolute z-0 h-[410px] opacity-30 border-b-[1px] w-full' />
      <div className='mx-auto box-content px-4 lg:w-[1260px]'>

        <div className={`relative my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>

          <h1 className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{CourseName}</h1>
          <p className={`text-richblack-200`}>{CourseDescription}</p>

          <div className="text-md flex flex-wrap items-center gap-2">
            <span className="text-yellow-25">{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span>{`(${RatingAndReviews.length} reviews)`}</span>
            <span>{`${StudentEnrolled.length} Student Enrolled`}</span>
          </div>

          <div>
            <p>Created By {Instructor.FirstName}</p>
          </div>

          <div className="flex flex-wrap gap-5 text-lg items-center">
            <GoClock size={20} />
            <p>Created At {formatDate(createdAt)}</p>
            <CiGlobe size={20} />
            <p>{Language}</p>
          </div>

          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <BuyCourseCard course={courseData} setShowModal={setShowModal} handleBuyCourse={handleBuyCourse} />
          </div>

        </div>
      </div>

      <div className="bg-richblack-900 w-full mt-[10rem]">
        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">

          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] text-white">
            <div className="my-8 border border-richblack-600 p-8">
              <p className="text-3xl font-semibold">What You'll Learn</p>
              <p className='mt-1 text-richblack-50 flex items-center gap-x-2'> <LuArrowBigRightDash className='text-green-300'/> {WhatYouWillLearn}</p>
            </div>

            <div className="max-w-[830px] ">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
              </div>

              <div className='flex justify-between mb-4'>
                <div className='flex gap-x-3'>
                  <span>{CourseContent.length} sectioin(s)</span>
                  <span>{totalNoOfLectures} Lecture(s)</span>
                  <span>{timeDuration} Total length</span>
                </div>

                <div>
                  <button className='text-yellow-5 hover:text-yellow-50'
                    onClick={() => setIsActive([])}>
                    Collapse All Sections
                  </button>
                </div>
              </div>


              {
                CourseContent?.map((sec, index) => (
                  <details key={index} open = {isActive.includes(index)}>
                    <summary className='list-none'
                    onClick={(e) => handleActive(e,index)}>
                       <div className='flex justify-between bg-richblack-600 p-6 border-b-[1px]'>
                        <p className='flex items-center gap-x-2 capitalize'>
                        {isActive.includes(index) ? <RiArrowDropDownLine /> : <RiArrowDropUpLine /> }
                        {sec.SectionTitle}
                        </p>
                        <p className='text-yellow-50'>{sec.SubSection.length || 0} lecture(s)</p>
                       </div>
                    </summary>

                    <div>
                      {
                        sec.SubSection.map((subSec, i) => (
                          <div key={i} className={`flex items-center gap-x-2 p-6 border-l-[1px] border-b-[1px] border-r-[1px] border-richblack-200`}>
                            <CiVideoOn className='text-red-200'/>
                            <p>{subSec.Title}</p>
                          </div>
                        ))
                      }
                    </div>
                  </details>
                ))
              }

              <div className='flex flex-col gap-3 mt-10 mb-10'>
                <p className='text-3xl font-semibold'>Author</p>
                <div className='flex items-center gap-x-2'>
                <img src={Instructor?.UserImageUrl} className="h-12 w-12 rounded-full object-cover"/>
                <p className='font-semibold'>{Instructor.FirstName} {Instructor.LastName}</p>
                </div>
                <p className='text-richblack-300'>{Instructor?.AdditionalDetails?.About}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Footer/>
      {
        showModal && <Modal modalData={showModal} ref={modalRef} />
      }

    </div>
  )
}

export default CourseDetails
