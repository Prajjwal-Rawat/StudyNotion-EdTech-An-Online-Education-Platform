import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import { ADD_RATING_AND_REVIEW, UPDATE_COURSE_PROGRESS } from "../Apis";


export const createRating = async(data, token) => {
   const toastId = toast.loading("Adding Review...");

   try{
     const response = await apiConnector("POST", ADD_RATING_AND_REVIEW, data, {
        Authorization: `Bearer ${token}`
     });

     console.log("Add Rating response -> ", response);

     if(!response?.data?.success){
        throw new Error(response.data.message);
     }

     toast.success("Thanku, Review is added Successfully");
   }catch(err){
    console.log("Failed to Add Rating & Reviews", err);
    toast.error(err.response.data.message);
   }finally{
    toast.dismiss(toastId);
   }
}



export const markLectureAsComplete = async(body, token) =>{
   const toastId = toast.loading("Loading...");
   let result = null;

   try{
      const response = await apiConnector("PUT", UPDATE_COURSE_PROGRESS, body, {
        Authorization: `Bearer ${token}`
      });

      console.log("Mark As completed lecture response -> ", response);

      if(!response?.data?.success){
         throw new Error(response.data.message);
      }

      toast.success("Lecture is successfully marked as completed");
      result = true;
   }catch(Err){
      console.log("Failed to mark lecture as completed", Err);
      toast.error("Failed to Mark Lecture As Completed");
   }finally{
      toast.dismiss(toastId);
      return result;
   }
}