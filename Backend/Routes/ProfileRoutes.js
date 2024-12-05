const express = require("express");
const routes = express.Router();

const {UpdateProfile, DeleteAccount, updateDisplayPicture, getAllUserDetails, getEnrolledCourses, instructorDashboard} = require("../Controllers/ProfileController");
const {Auth, isStudent, isInstructor, isAdmin} = require("../Middlewares/AuthMiddleware");



routes.put("/updateProfile", Auth, UpdateProfile);
routes.put("/updateImage", Auth, updateDisplayPicture);
routes.get("/getUserDetails", Auth, getAllUserDetails);
routes.get("/getEnrolledCourses", Auth, getEnrolledCourses);
routes.delete("/deleteAccount", Auth, DeleteAccount);
routes.get("/getInstructorDashboardDetails", Auth, isInstructor, instructorDashboard);


module.exports = routes;