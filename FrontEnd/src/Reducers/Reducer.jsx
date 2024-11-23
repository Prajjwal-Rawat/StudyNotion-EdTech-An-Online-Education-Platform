import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import cartReducer from "../Slices/CartSlice";
import profileReducer from "../Slices/ProfileSlice";
import viewCourseReducer from "../Slices/ViewCourseSlice";
import courseReducer from "../Slices/CourseSlice";

const rootReducer = combineReducers({
   auth: authReducer,
   Cart: cartReducer,
   Profile: profileReducer,
   viewCourse: viewCourseReducer,
   course : courseReducer

})

export default rootReducer;