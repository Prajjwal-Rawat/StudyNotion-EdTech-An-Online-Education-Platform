import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import { getCatalogPageDetails } from '../Services/operations/catalogApis';
import { fetchCourseCategories } from '../Services/operations/CourseDetailsApi';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/common/Footer';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [newCourses, setNewCourses] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getCategories = async() => {
            try{

                const response = await fetchCourseCategories();
                const category_id = response.filter((categ) => categ.Category.split(" ").join("-").toLowerCase() === catalogName)[0]._id
                
                setCategoryId(category_id);
            }catch(err){
                
            }
        }

        getCategories();
    }, [catalogName]);



    useEffect(() => {
        if(!categoryId) return;
       const getCategoryDetails = async() => {
         const result = await getCatalogPageDetails(categoryId);

         if(result){
            setCatalogPageData(result);
         }
       }
       getCategoryDetails();
    }, [categoryId])
    

  return (
    <div className="box-content bg-richblack-800">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p  className="text-sm text-richblack-300">Home/ Catalog/ <span>{catalogPageData?.data?.selectedCategory?.Category}</span></p>
            <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.Category}</p>
            <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.Description}</p>
        </div>

        <div className=" mx-auto box-content lg:w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            {/* section 1 */}
            <div className="section_heading">
                <h1 className='text-2xl text-white font-semibold'>Course to Get You Started</h1>

                <div className="my-4 flex border-b border-b-richblack-600 gap-x-3 text-sm">
                <button className={`${newCourses ? "text-richblack-50" : "text-yellow-100 border-b border-b-yellow-25"}`}
                onClick={() => setNewCourses(false)}>
                   All Courses
                </button>
                <button className={`${!newCourses ? "text-richblack-50" : "border-b border-b-yellow-25 text-yellow-100"}`} 
                onClick={() => setNewCourses(true)}>
                   New Courses
                </button>
                </div>

                <div>
                    <CourseSlider Courses = {newCourses 
                         ? catalogPageData?.data?.newcourses?.Course
                         : catalogPageData?.data?.selectedCategory?.Course
                        }/>
                </div>
                
            </div>

             {/*section 2  */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='text-2xl text-white font-semibold'>Top Courses in {catalogPageData?.data?.selectedCategory?.Category}</p>
                <div className='py-8'>
                    <CourseSlider Courses = {catalogPageData?.data?.differentCategories}/>
                </div>
            </div>

           {/*section 3  */}
            <div className=" mx-auto box-content lg:w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='text-2xl text-white font-semibold'>Frequently Bought</div>
                <div className='py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5'>

                        {
                            catalogPageData?.data?.topSellingCourses?.slice(0,4).map((course, index) => (
                                <CourseCard course = {course} key = {index} Height = {"h-[400px]"}/>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Catalog
