const express = require("express");
const routes = express.Router();

//courses
const {createCourse, showAllCourses, getCourseDetails, editCourse, getFullCourseDetails, getInstructorCourses, deleteCourse} = require("../Controllers/CoursesController");

//course progress
const {updateCourseProgress} = require("../Controllers/CourseProgressController");

//categories
const {createCategory, ShowAllCategories, categoryPageDetails} = require("../Controllers/CategoryController");
//sections
const {createSection, updateSection, deleteSection} = require("../Controllers/SectionController");
//subsections
const {createSubSection, UpdateSubSection, DeleteSubSection} = require("../Controllers/SubSectionController");
//ratings and reviews
const {createRatings, getAverageRating, getAllRatings} = require("../Controllers/RatingAndReviewsController");

//updatecourseprogress

// middlewares
const {Auth, isStudent, isInstructor, isAdmin} = require("../Middlewares/AuthMiddleware");


//**********************       course routes        *************************

routes.post("/createCourse", Auth, isInstructor, createCourse);
routes.put("/editCourse", Auth, isInstructor, editCourse);
routes.delete("/deleteCourse", Auth, isInstructor, deleteCourse)
//add section
routes.post("/addSection", Auth, isInstructor, createSection);
//update section
routes.put("/updateSection", Auth, isInstructor, updateSection);
//deleteSection
routes.delete("/deleteSection", Auth, isInstructor, deleteSection);
//addSubSection
routes.post("/addSubSection", Auth, isInstructor, createSubSection);
//udateSubSection
routes.put("/updateSubSection", Auth, isInstructor, UpdateSubSection);
//deleteSubSection
routes.delete("/deleteSubSection", Auth, isInstructor, DeleteSubSection);

//get request

//get all courses
routes.get("/showAllCourses", showAllCourses);
//get courseDetails
routes.post("/getCourseDetails", Auth, getCourseDetails);
routes.post("/getFullCourseDetails", Auth, getFullCourseDetails);
//get instructor courses
routes.get("/getInstructorCourses", Auth, isInstructor, getInstructorCourses);



// ********************************************
//             course progress
// ********************************************
routes.put("/updateCourseProgress", Auth, isStudent, updateCourseProgress);



// *****************************************************************************

//                          Category Routes

//******************************************************************************

//create Category
routes.post("/createCategory", Auth, isAdmin, createCategory);
//show all categories
routes.get("/showAllCategories", ShowAllCategories);
//category page details
routes.post("/getCategoryPageDetails",  categoryPageDetails);



//********************************************************************************

//                           Rating And Reviews routes

//********************************************************************************


//create rating and reviews
routes.post("/addRating", Auth, isStudent, createRatings);
//get average ratings
routes.get("/getAverageRating", getAverageRating);
//get all ratings and reviews
routes.get("/getAllReviews", getAllRatings);



module.exports = routes;
