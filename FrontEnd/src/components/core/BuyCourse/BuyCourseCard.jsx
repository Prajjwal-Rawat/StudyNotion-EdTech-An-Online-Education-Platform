import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { MdArrowRight } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import toast from 'react-hot-toast';
import { addToCart } from '../../../Slices/CartSlice';

const BuyCourseCard = ({course, setShowModal, handleBuyCourse}) => {
    
    const {user} = useSelector((state) => state.Profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const disaptch = useDispatch();

    const{
    Price,
    Thumbnail,
    StudentEnrolled,
    instructions
    } = course;

    const handleAddToCart = () => {
    if(user && user?.AccountType === "Instructor"){
        toast.error("You Are an Instructor, You can't buy course");
        return;
    }
    if(token){
        disaptch(addToCart(course));
        return;
    }

    setShowModal({
      text1: "Your are not Logged In",
      text2: "Please login to But Course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setShowModal(null),
    })

    }

    const handleShare = () => {
       copy(window.location.href);
       toast.success("Link Copied");
    }

  return (
    <div  className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
       <img src={Thumbnail} alt="Thumbnail Img" className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />

       <div  className="space-x-3 pb-4 text-3xl font-semibold">
        Rs. {Price}
       </div>

       <div className='flex flex-col gap-y-6'>
          <button className='bg-yellow-50 px-5 py-2 w-full transition-all duration-300 hover:scale-105 active:scale-100 text-black font-semibold'
          onClick={user && StudentEnrolled.includes(user._id) 
            ? () => navigate("/dashboard/enrolled-courses")
            : handleBuyCourse }
          >
            {user && StudentEnrolled.includes(user._id) ? "Go to Course" : "Buy Now"}
          </button>

          {
            (!StudentEnrolled.includes(user._id) && (
                <button className='bg-richblack-600 px-5 py-2 w-full transition-all duration-300 hover:scale-105 active:scale-100 text-white font-semibold'
                onClick={handleAddToCart}>
                    Add To Cart
                </button>
            ))
          }
       </div>

       <div className='flex flex-col gap-1'>
        <p className='text-sm text-richblack-100'>30-Day Money-Back Guarantee</p>
        <p className='text-md text-richblack-100'>This course includes:</p>
        <div className='flex flex-col gap-y-3'>
           {
            instructions.map((item, i) => (
                <p key={i} className='flex gap-x-1 text-blue-200 items-center'>
                   <MdArrowRight /> <span className='text-sm text-blue-200'>{item}</span>
                </p>
            ))
           }
        </div>
       </div>

       <div>
        <button className='text-yellow-50 flex items-center gap-x-2 mx-auto p-6'
        onClick={() => handleShare()}>
           <FaRegShareFromSquare /> Share
        </button>
       </div>
    </div>
  )
}

export default BuyCourseCard
