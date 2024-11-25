import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import CourseCard from './CourseCard';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Pagination, EffectCoverflow, Autoplay, EffectCreative } from 'swiper/modules';
import "./Slider.css"

const CourseSlider = ({ Courses }) => {
    return (
        <>
            {
                Courses?.length ? (
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="mySwiper">
                        {
                            Courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"h-[220px]"} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
                    : (
                        <div className="text-xl text-richblack-5">
                            No Course Found
                        </div>
                    )
            }
        </>
    )
}

export default CourseSlider
