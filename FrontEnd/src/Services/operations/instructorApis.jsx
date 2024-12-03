import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { GET_INSTRUCTOR_DASHBOARD_DETAILS } from "../Apis";




export const getInstructorDetails = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_DASHBOARD_DETAILS, null, {
        Authorization: `Bearer ${token}`
      });

      console.log("instructor dashboard response -> ", response);

      if(!response?.data?.success){
        throw new Error(response.data.message);
      }

      result = response.data.data;
    }catch(Err){
      console.log("Failed to get instrictor dashboard details", Err);
      toast.error("Failed to get Instructor Dashboard Statistics");
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}