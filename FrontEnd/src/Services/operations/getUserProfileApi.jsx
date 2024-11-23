import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { GET_ENROLLED_COURSES_API } from "../Apis";



export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...");
    let result = [];

    try{
        const response = await apiConnector("GET", GET_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        });

        console.log("Get All Enrolled Courses response -> ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
    }catch(err){
        console.log("Error in geting user enrolled courses", err);
        toast.error("Failed to get enrolled courses");
    }finally{
       toast.dismiss(toastId);
       return result;
    }
}