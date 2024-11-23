import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../Slices/CartSlice';

const RenderCartItems = () => {

  const {cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
       {
        cart.map((course, index) => (
          <div>
            <div>
              <img src= {course.Thumbnail} alt="course_thumbnail" />
              
              <div>
                <p>{course.CourseName}</p>
                <p>{course.Category?.name}</p>

                <div>
                  <span>4.8</span>
                  <ReactStars
                  count={5}
                  size={20}
                  edit = {false}
                  color2={'#ffd700'}
                  />
                   <span>{course?.RatingAndReviews?.length} Ratings</span>
                </div>
              </div>
            </div>

            <div>
              <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line />
              <span>Remove</span>
              </button>
              <p>{course.Price}</p>
            </div>

          </div>
        ))
       }
    </div>
  )
}

export default RenderCartItems
