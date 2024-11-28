import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../Slices/CartSlice';
import { LiaRupeeSignSolid } from "react-icons/lia";
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../../common/RatingStars';

const RenderCartItems = () => {

  const {cart} = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
       {
        cart.map((course, index) => (
          <div key={index}
           className={`flex w-full flex-wrap items-start justify-between gap-6 ${
           index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
           } ${index !== 0 && "mt-6"} `}
          >
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img src= {course.Thumbnail} alt="course_thumbnail" className="h-[148px] w-[220px] rounded-lg object-cover"/>
              
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">{course.CourseName}</p>
                <p className="text-sm text-richblack-300">{course.Category?.Category}</p>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">{GetAvgRating(course.RatingAndReviews) || 0}</span>
                  <RatingStars Review_Count={GetAvgRating(course.RatingAndReviews)} Star_Size={19}/>
                  <span className="text-richblack-400">{course?.RatingAndReviews?.length} Ratings</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <button className="flex items-center gap-x-1 rounded-md border hover:text-red-400 border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              onClick={() => dispatch(removeFromCart(course._id))}
              >
              <RiDeleteBin6Line />
              <span>Remove</span>
              </button>
              <p className="mb-6 text-3xl flex items-center font-medium text-yellow-100"><LiaRupeeSignSolid /> {course.Price}</p>
            </div>

          </div>
        ))
       }
    </div>
  )
}

export default RenderCartItems
