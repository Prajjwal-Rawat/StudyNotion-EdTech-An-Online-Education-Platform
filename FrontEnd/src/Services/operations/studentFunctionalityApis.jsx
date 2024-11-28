import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {COURSE_PAYMENT_API, SEND_PAYMENT_MAIL, COURSE_VERIFY_API} from "../Apis";
import { removeFromCart, resetCart } from "../../Slices/CartSlice";

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}



export const buyCourse = async(coursesId, token, navigate, dispatch, userDetails, singleCourse = false) => {
   const toastId = toast.loading("Loding...");
   console.log("course id in api call", coursesId);
   try{
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if(!res){
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {coursesId}, {
        Authorization: `Bearer ${token}`
      });

      console.log("Payment order response -> ", orderResponse);

      if(!orderResponse?.data?.success){
        throw new Error(orderResponse.data.message);
      }

      const options = {
        key: import.meta.env.RAZOR_PAY_KEY,
        amount: orderResponse.data.data.amount,
        currency: orderResponse.data.data.currency,
        name: "StudyNotion",
        description:"Thank You",
        order_id: orderResponse.data.data.id,
        prefill:{
         name: `${userDetails.firstName}`,
         email: userDetails.email
        },
        theme: {
            color: '#F37254'
        },
        handler: function(response){
            sendPaymentSuccessMail(response, orderResponse.data.data.amount, token);
            verifyPayment({...response,coursesId}, token, navigate, dispatch, singleCourse);
        }
      }

      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function(response) {
        toast.error("opps, Payment Failed");
        console.log(response.error);
      })
   }catch(Err){
     console.log("Getting Error in Payment api", Err);
     toast.error(`Payment Failed ${Err.response.data.message}`);
   }finally{
    toast.dismiss(toastId);
   }
}


const sendPaymentSuccessMail = async(response, amount, token) => {
    try{
       await apiConnector("POST", SEND_PAYMENT_MAIL, {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
       }, {
        Authorization: `Bearer ${token}`
       });

       console.log("mail is send successfully");

    }catch(err){
      console.log("Error in Send Payment Mail Api", err);
    }
}


const verifyPayment = async(bodyData, token, navigate, dispatch, singleCourse) => {
  const toastId = toast.loading("Verifying Payment...");

  try{
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`
    });

    if(!response?.data?.success){
      throw new Error(response.data.message);
    }

    toast.success("Payment Successfull, You are Added to the course");
    navigate("/dashboard/enrolled-courses");
    singleCourse ? (dispatch(removeFromCart(bodyData.coursesId[0]))) : dispatch(resetCart()); 
  }catch(Err){
    console.log("Payment Failed, Could not verify payment", Err);
    toast.error("Payment Failed Could not verify payment");
  }finally{
    toast.dismiss(toastId);
  }
}