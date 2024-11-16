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