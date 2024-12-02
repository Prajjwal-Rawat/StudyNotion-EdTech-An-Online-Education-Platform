import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';
import { useSelector } from 'react-redux';
import ReactStars from "react-stars"

const CourseCard = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const {token} = useSelector((state) => state.auth);
    
    useEffect(() => {
        const count = GetAvgRating(course.RatingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
    return (
            <Link to={token ? `/courses/${course._id}` : '/login'}>
                <div>
                    <div className='rounded-lg'>
                        <img src= {course?.Thumbnail} alt='course.png'
                        className={`${Height} w-full rounded-xl object-cover hover:`}/>
                    </div>

                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">{course?.CourseName}</p>
                        <p className="text-sm text-richblack-50">Instructor: {course?.Instructor?.FirstName} {course?.Instructor?.LastName}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count = {avgReviewCount}/>
                            <span className="text-richblack-400">{course.RatingAndReviews.length} Rating</span>
                        </div>
                        <p className="text-xl text-richblack-5">Rs. {course.Price}</p>
                    </div>
                </div>
            </Link>
    )
}

export default CourseCard
