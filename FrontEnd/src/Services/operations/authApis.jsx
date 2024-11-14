import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import { LOGIN_API, SEND_OTP } from "../Apis";
import {setToken, setErrMessage} from "../../Slices/AuthSlice";
import {setUser} from "../../Slices/ProfileSlice";



export function sendOtp(Email, navigate){
    return async(dispatch) => {
       const toastId = toast.loading("Loading...");
       try{
           const response = await apiConnector("POST", SEND_OTP, {
            Email
           });

           console.log("Otp response -> ", response);

           if(!response.data.success){
              throw new Error(response.data.message);
           }

           toast.success("OTP Sent Successfully");
           navigate("/verify-email");
           dispatch(setErrMessage(""));
       }catch(err){
          console.log("Error in sendign OTP", err);
          toast.error("Failed To Send OTP");
          dispatch(setErrMessage(err.response.data.message));
       }finally{
        toast.dismiss(toastId);
       }
    }
}





export function login(Email, Password,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", LOGIN_API, {Email, Password});
            console.log("Login Response -> ", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.UserImageUrl 
            ? response.data.user.UserImageUrl
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.FirstName} ${response.data.user.LastName}`
            dispatch(setUser({...response.data.user, image: userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/dashboard/my-profile");
            dispatch(setErrMessage(""));
        }catch(err){
           console.log("Error in login ", err);
           toast.error("Login Failed");
           dispatch(setErrMessage(err.response.data.message) || "Login Failed");
        }finally{
            toast.dismiss(toastId);
        }
    }
}