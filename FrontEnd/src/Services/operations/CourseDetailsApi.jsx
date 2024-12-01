import {apiConnector} from "../apiConnector";
import { CREATE_COURSE, CREATE_SECTION, CREATE_SUB_SECTION, DELETE_COURSE, DELETE_SECTION, DELETE_SUB_SECTION, EDIT_COURSE_DETAILS, GET_ALL_COURSE_CATEGORIES, GET_COURSE_DETAILS, GET_FULL_COURSE_DETAILS, GET_INSTRUCTOR_COURSES, UPDATE_SECTION_DETAILS, UPDATE_SUB_SECTION } from "../Apis";
import {toast} from "react-hot-toast";


export const fetchCourseCategories = async() => {
    let result = [];
    try{
        const response = await apiConnector("GET", GET_ALL_COURSE_CATEGORIES);

        // console.log("Categories response -> ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.Categories;
    }catch(err){
        console.log("Failed to get course categories", err);
        toast.error(err.message);
    }

    return result;
}

export const editCourseDetails = async(formData, token) => {
    let result = null;
    const toastId = toast.loading("Updating...");

    try{
        const response = await apiConnector("PUT", EDIT_COURSE_DETAILS, formData, {
            Authorization: `Bearer ${token}`
        });

        console.log("Edit course Response -> ", response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    }catch(err){
     console.log("Failed to edit the course details", err);
     toast.error("Failed to edit Course Details");
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}


export const addCourseDetails = async(formdata, token) => {
    let result = null;
    const toastId = toast.loading("Adding Course Details...");

    try{
       const response = await apiConnector("POST", CREATE_COURSE, formdata, {
        Authorization: `Bearer ${token}`
       });

       console.log("Add New Course Details Response -> ", response);

       if(!response?.data?.success){
        throw new Error(response.data.message)
       }

       toast.success("Course Details Added Successfully");
       result = response?.data?.data;
    }catch(err){
      console.log("Failed to Add New Course Details", err);
      toast.error("Failed to add course details");
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}



export const updateSection = async(data, token) => {
  let result = null;
  const toastId = toast.loading("Updating Section...");

  try{
     const response = await apiConnector("PUT", UPDATE_SECTION_DETAILS, data, {
        Authorization: `Bearer ${token}`
     });

     console.log("Updated Section reponse -> ", response);

     if(!response?.data?.success){
        throw new Error(response.data.message);
     }

     toast.success("Section Details Updated Successfully");
     result = response?.data?.data
  }catch(err){
    console.log("Failed to update section details", err);
    toast.error("Failed to update section details");
  }finally{
    toast.dismiss(toastId);
    return result;
  }
}



export const createSectionDetails = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Creating Section...");

    try{
       const response = await apiConnector("POST", CREATE_SECTION, data, {
         Authorization: `Bearer ${token}`
       });

       console.log("Create Section response -> ", response);

       if(!response?.data?.success){
          throw new Error(response.data.message);
       }

       toast.success("Section is created successfully");
       result = response?.data?.updatedCourseDetail;
       
    }catch(err){
        console.log("Failed to create section ", err);
        toast.error("Failed to create section");
    }finally{
        toast.dismiss(toastId);
        return result
    }
}



export const deleteSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Deleting...");

    try{
       const response = await apiConnector("DELETE", DELETE_SECTION, data, {
        Authorization: `Bearer ${token}`
       });

       console.log("Delete section response -> ", response);

       if(!response?.data?.success){
        throw new Error(response.data.message);
       }

       toast.success("Section Deleted Successfully");
       result = response.data.data;
    }catch(err){
       console.log("Failed to delete section", err);
       toast.error("Failed to delete Section");
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}


export const deleteSubSection = async(data, token) => {
   let result = null;
   const toastId = toast.loading("Deleting...");

   try{
      const response = await apiConnector("DELETE", DELETE_SUB_SECTION, data, {
        Authorization: `Bearer ${token}`
      });

      console.log("Deleted Sub Section response -> ", response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Sub Section Deleted Successfully");
      result = response.data.data;
   }catch(err){
      console.log("Failed to delete Sub Section", err);
      toast.error("Failed to delete Sub Section");
   }finally{
    toast.dismiss(toastId);
    return result;
   }
}



export const updateSubSection = async(data, token) => {
   let result = null
   const toastId = toast.loading("Updating...");

   try{
      const response = await apiConnector("PUT", UPDATE_SUB_SECTION, data, {
        Authorization: `Bearer ${token}`
      });

      console.log("Updated sub Section response -> ", response);

      if(!response?.data?.success){
        throw new Error(response.data.message);
      }

      toast.success("Lecture Updated Successfully");
      result = response?.data?.updatedSection;
   }catch(err){
     console.log("Failed to update Sub Section details", err);
     toast.error("Failed to Update Lecture");
   }finally{
    toast.dismiss(toastId);
    return result;
   }
}



export const createSubSection = async(formData, token) => {
    let result = null;
    const toastId = toast.loading("Creating Lecture...");

    try{
       const response = await apiConnector("POST", CREATE_SUB_SECTION, formData, {
        Authorization: `Bearer ${token}`
       });

       console.log("Create Sub Section response -> ", response);

       if(!response?.data?.success){
        throw new Error(response.data.message);
       }

       toast.success("Lecture Added Successfully");
       result = response.data.updatedSection;
    }catch(err){
        console.log("Failed to add lecture", err);
        toast.error("Failed to add lecture");
    }finally{
        toast.dismiss(toastId);
        return result;
    }
}



export const fetchInstructorCourses = async(token) => {
    let result = [];
    const toastId = toast.loading("Loading...");

    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES, null, {
        Authorization: `Bearer ${token}`
      });

      console.log("Instructor courses response -> ", response);
      
      if(!response?.data?.success){
        throw new Error(response.data.message);
      }
      
      result = response?.data?.data;
    }catch(err){
      console.log("Failed to get instructor courses", err);
      toast.error(err.message);
    }finally{
      toast.dismiss(toastId);
      return result;
    }
}



export const getDetailsOfCourse = async(courseId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try{
    const response = await apiConnector("POST", GET_COURSE_DETAILS, {courseId}, {
      Authorization: `Bearer ${token}`
    });

    console.log("Course Details response -> ", response);

    if(!response?.data?.success){
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  }catch(err){
    console.log("Failed to get course Details", err);
    toast.error("Failed to get course details");
  }finally{
    toast.dismiss(toastId);
    return result;
  }
}



export const getAllCourseDetails = async(courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try{
      const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS, {courseId}, {
        Authorization: `Bearer ${token}`
      });

      console.log("Full course details response -> ", response);

      if(!response?.data?.success){
        throw new Error(response.data.message);
      }

      result = response?.data?.data;
      
  }catch(err){
    console.log("Failed to get All course details ", err);
    toast.error("Failed to get Course Details");
  }finally{
    toast.dismiss(toastId);
    return result;
  }
}





export const deleteCourse = async(courseId, token) => {
  const toastId = toast.loading("Deleting...");

  try{
    const response = await apiConnector("DELETE", DELETE_COURSE, courseId, {
      Authorization: `Bearer ${token}`
    });

    console.log("Delete Course response -> ", response);

    if(!response?.data?.success){
      throw new Error(response.data.message);
    }

    toast.success("Course Deleted Successfully");
  }catch(err){
    console.log("Failed to delete course", err);
    toast.error("Failed to delete Course");
  }finally{
    toast.dismiss(toastId);
  }
}

