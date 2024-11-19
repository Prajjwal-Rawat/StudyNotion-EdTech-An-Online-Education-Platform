import {toast} from "react-hot-toast"
import {apiConnector} from "../apiConnector";
import { CHANGE_PASSWORD, DELETE_ACCOUNT_API, UPDATE_PROFILE_DETAILS_API, UPDATE_PROFILE_IMG_API } from "../Apis";
import { logout } from "./authApis";
import { setUser } from "../../Slices/ProfileSlice";


export function UpdateProfilePicture(token, profilePicture){
    return async(dispatch) => {
       const toastId = toast.loading("Uploading...");

       try{
          const response = await apiConnector("PUT", UPDATE_PROFILE_IMG_API, profilePicture, {
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
          });

          console.log("Update Profile Image Response -> ", response);

          if(!response.data.success){
            throw new Error(response.data.message);
          }

          toast.success("Image Uploaded successfully");
          dispatch(setUser(response.data.data));
       }catch(err){
          console.log("Failed to upload profile image", err);
          toast.error("Failed to Upload Image");
       }finally{
        toast.dismiss(toastId);
       }
    }
}


export function UpdateProfileDetails(token, formData){
    return async(dispatch) =>{
       const toastId = toast.loading("Updating...");

       try{
          const response = await apiConnector("PUT", UPDATE_PROFILE_DETAILS_API, formData, {
            Authorization: `Bearer ${token}`
          });

          console.log("Update profile details response -> ", response);

          if(!response.data.success){
            throw new Error(response.data.message);
          }

          toast.success("Details Updated Successfully");
          dispatch(setUser(response.data.userDetails));
       }catch(err){
         console.log("Failed to Update Profile Details ", err);
         toast.error("Failed to update details");
       }finally{
        toast.dismiss(toastId);
       }
    }
}



export function changePassword(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Updating...");

        try{
          console.log("form data is ", formData);
          const response = await apiConnector("PUT", CHANGE_PASSWORD, formData, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          });

          console.log("Change Password response -> ", response);

          if(!response.data.success){
            throw new Error(response.data.message);
          }

          toast.success("Password Updated Successfully");
        }catch(err){
          console.log("Failed to update the password", err);
          toast.error("Failed to update password");
        }finally{
            toast.dismiss(toastId);
        }
    }
}


export function deleteAccount(token, navigate){
  return async(dispatch) => {
     const toastId = toast.loading("Deleting Account ...");

     try{
        const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
          Authorization: `Bearer ${token}`
        });

        console.log("delete account response -> ", response);

        if(!response.data.success){
          throw new Error(response.data.message);
        }

        toast.success("Successfully Deleted Account");
        dispatch(logout(navigate));
     }catch(err){
        console.log("Failed to delete Account", err);
        toast.error("Failed to delete account");
     }finally{
      toast.dismiss(toastId);
     }
  }
}