import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import cartReducer from "../Slices/CartSlice";
import profileReducer from "../Slices/ProfileSlice";

const rootReducer = combineReducers({
   auth: authReducer,
   Cart: cartReducer,
   Profile: profileReducer

})

export default rootReducer;