import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { LOGIN_API, RESET_PASSWORD, RESET_PASSWORD_TOKEN, SEND_OTP, SIGNUP_API } from "../Apis";
import { setToken, setErrMessage, setLoading } from "../../Slices/AuthSlice";
import { setUser } from "../../Slices/ProfileSlice";



export function sendOtp(Email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", SEND_OTP, {
                Email
            });

            console.log("Otp response -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
            dispatch(setErrMessage(""));
        } catch (err) {
            console.log("Error in sendign OTP", err);
            toast.error("Failed To Send OTP");
            dispatch(setErrMessage(err.response.data.message));
        } finally {
            toast.dismiss(toastId);
        }
    }
}


export function signUp(FirstName, LastName, Email, Password, ConfirmPassword, MobileNo, UserOtp, AccountType, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {
           const response = await apiConnector("POST", SIGNUP_API, {
            FirstName,
            LastName, 
            Email, 
            Password, 
            ConfirmPassword, 
            MobileNo, 
            UserOtp, 
            AccountType
           });

           console.log("SignUp response -> ", response);

           if(!response.data.success){
            throw new Error(response.data.message);
           }

           toast.success("Sign Up Successfully");
           navigate("/login");
        } catch (err) {
           console.log("Sign Up failed ", err);
           toast.error("Failed to signUp");

        }finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}





export function login(Email, Password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", LOGIN_API, { Email, Password });
            console.log("Login Response -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.UserImageUrl
                ? response.data.user.UserImageUrl
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.FirstName} ${response.data.user.LastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/dashboard/my-profile");
            dispatch(setErrMessage(""));
        } catch (err) {
            console.log("Error in login ", err);
            toast.error("Login Failed");
            dispatch(setErrMessage(err.response.data.message) || "Login Failed");
        } finally {
            toast.dismiss(toastId);
        }
    }
}



export function getPasswordResetToken(Email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {

            const response = await apiConnector("POST", RESET_PASSWORD_TOKEN, {
                Email
            });

            console.log("Reset password token -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Password Mail sent Successfully");
            setEmailSent(true)
        } catch (err) {
            console.log("Error in sending reset email ", err);
            toast.error("Failed to send email for reset password");

        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}


export function resetPassword(Password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", RESET_PASSWORD, {
                Password,
                confirmPassword,
                token
            });

            console.log("reset password response -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password reset successfully");
            navigate("/login");
        } catch (err) {
            console.log("Error in reseting password", err);
            toast.error("Failed to reset password");

        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}