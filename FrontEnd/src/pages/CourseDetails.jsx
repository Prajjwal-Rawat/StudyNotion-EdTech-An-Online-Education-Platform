import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { buyCourse } from '../Services/operations/studentFunctionalityApis'
import { getDetailsOfCourse } from '../Services/operations/CourseDetailsApi';

const CourseDetails = () => {
  
  const navigate = useNavigate();
  const disaptch = useDispatch();
  const {token}  = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.Profile);
  const [courseData, setCourseData] = useState(null);
  const courseId = useParams();


  function handleBuyCourse(){
    if(token){
      buyCourse([courseId], token, navigate, disaptch, user);
      return;
    }
  }


 useEffect(() => {
  try{
    const result = getDetailsOfCourse(courseId.courseId,token);
    if(result){
      setCourseData(result);
    }
  }catch(err){
   console.log("error in fetching course details",err);
  }
 }, [courseId]);

  return (
    <div className='flex items-center mt-5'>
       <button className='bg-yellow-25 p-6 hover:bg-yellow-200 hover:scale-105 active:scale-100'
       onClick={() => handleBuyCourse()}>
          Buy Now
       </button>
    </div>
  )
}

export default CourseDetails
