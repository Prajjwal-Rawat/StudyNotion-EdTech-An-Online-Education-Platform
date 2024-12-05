import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Pagination, EffectCoverflow, Autoplay, EffectCreative } from 'swiper/modules';
// import "./Slider.css"
import ReactStars from "react-stars"
import { apiConnector } from "../../Services/apiConnector"
import { GET_ALL_RATING_AND_REVIEWS } from '../../Services/Apis';

const ReviewSlider = () => {


    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const wordsRange = 15;


    useEffect(() => {
        const fetchAllReviews = async () => {
            const res = await apiConnector("GET", GET_ALL_RATING_AND_REVIEWS);

            if (res) {
                setReviews(res.data.data);
            }
            setLoading(false);
        }
        fetchAllReviews();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
    <div className="lg:w-11/12 w-screen max-w-screen-lg lg:mx-auto">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="rounded-lg"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col p-5 -ml-20 w-fit lg:w-[400px] lg:h-[190px]  bg-gray-700 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* User Info */}
              <div className="flex mb-4">
                <img src={review.User.UserImageUrl} className='max-w-9 max-h-9 rounded-full object-cover'/>
                <div className="ml-4">
                  <p className="text-lg font-semibold">{review.User.FirstName} {review.User.LastName}</p>
                  <p className="text-sm text-gray-400">{review.course.CourseName}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <p className="text-sm">
                  {review.Review.length > wordsRange
                    ? `${review.Review.split(" ").slice(0, wordsRange).join(" ")}...`
                    : review.Review}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-x-2">
                <p className="text-xl font-bold">{review.Rating.toFixed(1)}</p>
                <ReactStars
                  count={5}
                  value={review.Rating}
                  size={24}
                  edit={false}
                  color2="#ffd700"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    )
}

export default ReviewSlider
