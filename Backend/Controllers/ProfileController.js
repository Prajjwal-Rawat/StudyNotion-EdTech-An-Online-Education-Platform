const ProfileModel = require("../Models/ProfileModel");
const UserModel = require("../Models/UserModel");
const CoursesModel = require("../Models/CoursesModel");
const { default: mongoose } = require("mongoose");
const {FilesUpload} = require("../Utils/FilesUpload");
const {convertSecondsToDuration} = require("../Utils/secToDuration");
const CourseProgressModel = require("../Models/CourseProgressModel");


//update profile

exports.UpdateProfile = async(req,res) => {
    try{

        const {Gender, DateOfBirth, About, Profession, MobileNo} = req.body;

        const userId = req.user.id;

        if(!userId){
            console.log("User id is missing");
            return res.status(400).json(
                {
                    success:false,
                    message:"User Id is missing"
                }
            )
        }

        let ProfileDetails = {}
        if(Gender) ProfileDetails.Gender = Gender;
        if(DateOfBirth) ProfileDetails.DateOfBirth = DateOfBirth;
        if(About) ProfileDetails.About = About;
        if(Profession) ProfileDetails.Profession = Profession;

        if(Object.keys(ProfileDetails).length === 0 && !MobileNo){
            return res.status(400).json(
                {
                    success:false,
                    message:"No fields to update. Please provide at least one field."
                }
            )
        }

        //find user and fetch profile id from it 
        let userDetails = await UserModel.findById(userId).populate("AdditionalDetails").exec();
        
        if(!userDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"User Not Found"
                }
            )
        }

        if(MobileNo){
            userDetails.MobileNo = MobileNo;
            await userDetails.save();
        }
         
        if(Object.keys(ProfileDetails).length > 0){
            const ProfileId = userDetails.AdditionalDetails;
            const updatedProfile = await ProfileModel.findByIdAndUpdate(ProfileId, ProfileDetails, {new:true});
            userDetails = await UserModel.findById(userId).populate("AdditionalDetails").exec();
            return res.status(200).json(
                {
                    success:true,
                    updatedProfile,
                    userDetails,
                    message:"Profile details are updated successfully"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                userDetails,
                message:"Mobile number updated successfully"
            }
        )


    }catch(err){
        console.log("Got Some Error in Updating Profile");
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error in Updating Profile Details"
            }
        )
    }
}


//update profile picture

exports.updateDisplayPicture = async(req,res) => {
    try{
        const userId = req.user.id;
        const profilePicture = req.files.profilePicture;

        if(!userId){
            return res.status(400).json(
                {
                    success:false,
                    message:"User id is missing"
                }
            )
        }

        if(!profilePicture){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please provide a profile picture"
                }
            )
        }

        const image = await FilesUpload(profilePicture, process.env.FOLDER_NAME,1000,1000);

        //update in user model
        const imageUpdate = await UserModel.findByIdAndUpdate(userId, {UserImageUrl:image.secure_url}, {new:true});

        if(!imageUpdate){
            return res.status(404).json(
                {
                    success:false,
                    message:"User not found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data:imageUpdate,
                message:"Image updated successfully"
            }
        )
    }catch(err){
       console.log("Getting Error in updating profile picture ", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Server error in updating profile picture"
        }
       )
    }
}




//get user details
exports.getAllUserDetails = async(req,res) => {
    try{
        const userId = req.user.id;

        if(!userId){
            return res.status(400).json(
                {
                    success:false,
                    message:"UserId is missing"
                }
            )
        }

        const userDetails = await UserModel.findById(userId).populate("AdditionalDetails").exec();

        if(!userDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:`User not found by this Id ${userId}`
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                data:userDetails,
                message:"User Profile details are fetched"
            }
        )
    }catch(err){
       console.log("Errro in fetching user profile details");
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Server error in fetching user profile details"
        }
       )
    }
}



exports.getEnrolledCourses = async(req,res) => {
    try{
        const userId = req.user.id;

        let userDetails = await UserModel.findById(userId).populate({
            path: "Courses",
            populate: {
                path:"CourseContent",
                populate:{
                    path: "SubSection"
                },
            },
        }).exec();

        if(!userDetails){
            return res.status(400).json(
                {
                    success:false,
                    message: `Could not find user with this id ${userId}`
                }
            )
        }

        userDetails = userDetails.toObject();

        for(const course of userDetails.Courses){

            const totalDurationInSeconds = course.CourseContent
                                          .flatMap((sec) => sec.SubSection)
                                          .reduce((total, subSec) => total + parseInt(subSec.TimeDuration),0);
            
            course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

           const completedVideos = await CourseProgressModel.findOne({
            courseID: course._id,
            userId: userId
           });

           const completedCount = completedVideos?.completedVideos.length || 0;

           const totalSubSections = course.CourseContent.reduce((count, content) => count + content.SubSection.length, 0);

           course.progressPercentage = totalSubSections === 0 ? 100 : Number(((completedCount/totalSubSections) * 100).toFixed(2));

        }


        res.status(200).json(
            {
                success:true,
                data: userDetails.Courses,
                message:"successfully fetched enrolled courses"
            }
        )
    }catch(err){
        console.log("Error in fetching enrolled courses", err);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Server Error in fetching Enrolled Courses"
            }
        )
    }
}


exports.instructorDashboard = async(req,res) => {
    try{
        const instructorId = req.user.id;
        const courseDeatils = CoursesModel.find({Instructor:instructorId});

        if(!courseDeatils){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course Details Not Found"
                }
            )
        }

        const courseData = (await courseDeatils).map((course) => {
            const totalStudentEnrolled = course.StudentEnrolled.length;
            const totalAmount = totalStudentEnrolled * course.Price;

            const courseDataStats = {
                _id: course._id,
                courseName: course.CourseName,
                courseDescription: course.CourseDescription,
                totalStudentEnrolled,
                totalAmount,
            }
            return courseDataStats;
        });

        res.status(200).json(
            {
                success:true,
                data: courseData,
                message:"Instructor Dashboard Details Fetched Successfully"
            }
        )

    }catch(err){
        console.error("can not fetch instructor dashboard details", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Error in fetching instructor dashboard details"
            }
        )
    }
}


//Deleting Account

//crone job --> scheduling task -- implement scheduling in deleting account

exports.DeleteAccount = async(req,res) => {
    try{
        //fetch userid
        const userId  = req.user.id;
        //validate userid
        if(!userId){
            return res.status(400).json(
                {
                    success:false,
                    message:"User Id Not Found"
                }
            )
        }
        //check if user is present or not 
        const UserDetails = await UserModel.findById(userId);
        if(!UserDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"User Not Found"
                }
            )
        }
        //if user is present then check if user bought or have courses or not
        
        const userCourses = await CoursesModel.find({StudentEnrolled:userId});     //it will give all the courses that is enrolled

        if(userCourses.length > 0){

            await Promise.all(
                userCourses.map(async(course) => {
                    await CoursesModel.findByIdAndUpdate(course._id, {$pull:{StudentEnrolled:userId}});  //so now here we pull all the id of courses that are bought by the student account
                })
            )

        }else{
            console.log("No courses fount for this user, No courses bought by this user");
        }
          
        //fetch profileid and then delete its profile info
        const UserProfileId = UserDetails.AdditionalDetails;
        if(UserProfileId){
            await ProfileModel.findByIdAndDelete(UserProfileId);
        }

        //then delete the user
        await UserModel.findByIdAndDelete(userId);

        res.status(200).json(
            {
                success:true,
                message:"Account Deleted Successfully"
            }
        )

    }catch(err){
        console.log("Got some error while deleting the account", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error in deleting account"
            }
        )
    }
}