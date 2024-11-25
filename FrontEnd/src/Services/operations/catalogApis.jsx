import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { GET_CATAGORIES_DETAILS } from "../Apis";



export const getCatalogPageDetails = async(categoryId) => {
    let result = []
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", GET_CATAGORIES_DETAILS, {categoryId:categoryId});

        console.log("Categories page details response -> ", response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        result = response?.data;
    }catch(err){
        console.log("Failed to fetch category page details", err);
        toast.error(err.response.data.message); 
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}