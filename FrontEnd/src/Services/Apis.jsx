const BaseUrl = import.meta.env.VITE_APP_BASE_URL;

//Auth Apis
export const categories = {
    CATEGORIES_API: BaseUrl + "course/showAllCategories"
}
export const LOGIN_API = BaseUrl + "auth/login";
export const SIGNUP_API = BaseUrl + "auth/signUp";
export const SEND_OTP = BaseUrl + "auth/sendOtp";
export const CHANGE_PASSWORD = BaseUrl + "auth/changePassword";
export const RESET_PASSWORD_TOKEN = BaseUrl + "auth/reset-password-token";
export const RESET_PASSWORD = BaseUrl + "auth/resetPassword";



//Contact us Api
export const CONTACTUS_API = BaseUrl + "contact/contactUs";


//update profile apis
export const UPDATE_PROFILE_IMG_API = BaseUrl + "profile/updateImage";
export const DELETE_ACCOUNT_API = BaseUrl + "profile/deleteAccount";
export const UPDATE_PROFILE_DETAILS_API = BaseUrl + "profile/updateProfile";
export const GET_ENROLLED_COURSES_API = BaseUrl + "profile/getEnrolledCourses";



//courses api

export const GET_ALL_COURSE_CATEGORIES = BaseUrl + "course/showAllCategories";
export const GET_CATAGORIES_DETAILS = BaseUrl + "course/getCategoryPageDetails";
export const GET_FULL_COURSE_DETAILS = BaseUrl + "course/getFullCourseDetails";
export const EDIT_COURSE_DETAILS = BaseUrl + "course/editCourse";
export const CREATE_COURSE = BaseUrl + "course/createCourse";
export const DELETE_COURSE  = BaseUrl + "course/deleteCourse";
export const CREATE_SECTION = BaseUrl + "course/addSection";
export const UPDATE_SECTION_DETAILS = BaseUrl + "course/updateSection";
export const DELETE_SECTION = BaseUrl + "course/deleteSection";
export const CREATE_SUB_SECTION = BaseUrl + "course/addSubSection";
export const UPDATE_SUB_SECTION = BaseUrl + "course/updateSubSection";
export const DELETE_SUB_SECTION = BaseUrl + "course/deleteSubSection";
export const GET_INSTRUCTOR_COURSES = BaseUrl + "course/getInstructorCourses";
export const GET_COURSE_DETAILS = BaseUrl + "course/getCourseDetails";


//payment api
export const COURSE_PAYMENT_API = BaseUrl + "payment/capturePayment";
export const COURSE_VERIFY_API = BaseUrl + "payment/verifySignature";
export const SEND_PAYMENT_MAIL = BaseUrl + "payment/sendPaymentMail";

//Rating & Reviews
export const ADD_RATING_AND_REVIEW = BaseUrl + "course/addRating";

//course progress
export const UPDATE_COURSE_PROGRESS = BaseUrl + "course/updateCourseProgress";




