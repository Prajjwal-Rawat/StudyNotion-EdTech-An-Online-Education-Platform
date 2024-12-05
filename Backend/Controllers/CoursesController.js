const CoursesModel = require("../Models/CoursesModel");
const CategoryModel = require("../Models/CategoryModel");
const UserModel = require("../Models/UserModel");
const SectionModel = require("../Models/SectionModel");
const SubSectionModel = require("../Models/SubSectionModel");
const CourseProgessModel = require("../Models/CourseProgressModel");
const { FilesUpload } = require("../Utils/FilesUpload");
const {convertSecondsToDuration} = require("../Utils/secToDuration");
require("dotenv").config();


exports.createCourse = async(req,res) => {
    try{

        //fetch data and file

        const {CourseName, CourseDescription, Language, WhatYouWillLearn, instructions, Price, Tags, status, Category} = req.body;

        const Thumbnail = req.files.thumbnailImage;

        console.log("formdata in backend -> ", CourseName, CourseDescription, Language, WhatYouWillLearn, instructions, Price, Tags, status, Category)
        console.log("thumbnail", Thumbnail);

        const tag = JSON.parse(Tags);
        const Instructions = JSON.parse(instructions);


        //validate
        if(!CourseName || !CourseDescription || !Language || !WhatYouWillLearn || !instructions || !Price || !Tags || !Thumbnail || !Category){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all fields, All fields are required"
                }
            )
        }

        //instructor detail
        const InstructorId = await req.user.id;
        if (!InstructorId) {
            return res.status(404).json({
              success: false,
              message: "User id not found"
            });
        }


        // category validation
        const categoryDetail = await CategoryModel.findById(Category);

        if(!categoryDetail){
            return res.status(404).json(
                {
                    success:false,
                    message:"category Details not found"
                }
            )
        }

        //upload thumbnail image
        const UploadThumbnailImage = await FilesUpload(Thumbnail, process.env.FOLDER_NAME);

        //Entry in DB
        const CourseDetail = await CoursesModel.create({
            CourseName,
            CourseDescription,
            Instructor:InstructorId,
            Language,
            Price,
            WhatYouWillLearn,
            Tags: tag,
            instructions: Instructions,
            Category:categoryDetail._id,
            Thumbnail:UploadThumbnailImage.secure_url,
            status:status
        });

        //Entry in User model for course creation if it is instructor
        await UserModel.findByIdAndUpdate({_id:InstructorId}, {$push:{Courses:CourseDetail._id}},{new:true});

        //update tag model
        await CategoryModel.findByIdAndUpdate({_id:categoryDetail._id}, {$push:{Course:CourseDetail._id}},{new:true});

        //return response 

        res.status(200).json(
            {
                success:true,
                data:CourseDetail,
                message:"Course created successfully"
            }
        )

    }catch(err){
       console.log("Got some error while creating new course ", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Internal Error while creating new course"
        }
       )
    }
}



// get all courses

exports.showAllCourses = async(req,res) => {
    try{
        const AllCourses = await CoursesModel.find({status: "Published"}, {
            CourseName: true,
            CourseDescription: true,
            Price:true,
            Thumbnail:true,
            Instructor:true
        }).populate("Instructor").exec();

        res.status(200).json(
            {
                success:true,
                courses:AllCourses,
                message:"Successfully fetched all courses"
            }
        )
    }catch(err){
       console.log("Got some error while fetching courses data");
       res.status(500).json(
        {
            success:false,
            message:"Internal Error while fetching courses data",
            error:err.message
        }
       )
    }
}



//getCourseDetails


exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"CourseId is missing"
                }
            )
        }

        const courseDetails = await CoursesModel.findOne({_id:courseId}).populate({
            path:"Instructor",
            populate:{
                path:"AdditionalDetails"
            }
        }).populate({
            path:"CourseContent",
            populate:{
                path:"SubSection"
            }
        }).populate("RatingAndReviews")
        .populate("Category")
        .exec();

        //validate
        if(!courseDetails){
           return res.status(404).json(
            {
                success:false,
                message:`No Course Found by this Id: ${courseId}`
            }
           )
        }

        let totalDurationInSeconds = 0;
        courseDetails.CourseContent.forEach((content) => {
            content.SubSection.forEach((SubSec) => {
                const timeDurationInSeconds = parseInt(SubSec.TimeDuration);
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        res.status(200).json(
            {
                success:true,
                data:{
                    courseDetails,
                    totalDuration
                },
                message:"Course Details are fetched successfully"
            }
        )
    }catch(err){
       console.log("Error in finding course details ", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Error occured while fetching course details"
        }
       )
    }
}



exports.editCourse = async(req,res) => {
   try{
       const {courseId} = req.body;
       const updates = req.body;

       const course = await CoursesModel.findById(courseId);

       if(!course){
        return res.status(404).json(
            {
               success:false,
               message:"Course not found"
            }
        )
       }

       if(req.files) {
        const thumbnail = req.files.thumbnailImage;
        const updateThumbnailImg = await FilesUpload(thumbnail, process.env.FOLDER_NAME);
        course.Thumbnail = updateThumbnailImg.secure_url
       }

       for(const key in updates){
        if(updates.hasOwnProperty(key)){
            if(key === "Tags" || key === "instructions"){
             course[key] = JSON.parse(updates[key])   
            }else{
                course[key] = updates[key]
            }
        }
       }
       await course.save();

       const updatedCourse = await CoursesModel.findById(courseId)
       .populate({
        path: "Instructor",
        populate: {
            path: "AdditionalDetails"
        }
       })
       .populate("Category")
       .populate("RatingAndReviews")
       .populate({
        path: "CourseContent",
        populate:{
            path: "SubSection"
        }
       }).exec();

       res.status(200).json(
        {
            success:true,
            data:updatedCourse,
            message: "Course Updated Successfully"
        }
       )
   }catch(err){
    console.log("Error in editing Course details", err);
    res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Internal Error in Editing Course Details"
        }
    )
   }
}


exports.getFullCourseDetails = async(req,res) => {
    try{
       const {courseId} = req.body;
       const userId = req.user.id;

       const courseDetails = await CoursesModel.findById(courseId)
       .populate({
        path: "Instructor",
        populate:{
            path: "AdditionalDetails"
        }
       })
       .populate("Category")
       .populate("RatingAndReviews")
       .populate({
        path: "CourseContent",
        populate:{
            path:"SubSection",
        }
       }).exec();

       let courseProgressCount = await CourseProgessModel.findOne({
        courseID: courseId,
        userId: userId
       });

       console.log("Course Progress Count", courseProgressCount);

       if(!courseDetails){
        return res.status(404).json(
            {
                success:false,
                message:`No Course Found By this ID: ${courseId}`
            }
        )
       }

       let totalDurationInSeconds = 0;
       courseDetails.CourseContent.forEach((sec) => {
        sec.SubSection.forEach((subSec) => {
            const timeDurationInSeconds = parseInt(subSec.TimeDuration);
            totalDurationInSeconds += timeDurationInSeconds;
        })
       });

       const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

       return res.status(200).json(
        {
            success:true,
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos 
                                ? courseProgressCount?.completedVideos
                                :[],
            },
            message:"Successfully fetched Full Course Details"
        }
       )
       
    }catch(err){
        console.log("Error in fetching course details", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Failed to fetch course details"
            }
        )
    }
}



exports.getInstructorCourses = async(req,res) => {
    try{
        const instructorId = req.user.id;

        if(!instructorId){
          return res.status(400).json(
            {
                success:false,
                message:"Instructor Id is missing"
            }
          )
        }

        const instructorCourses = await CoursesModel.find({Instructor:instructorId}).sort({createdAt: -1}).populate({
            path:"CourseContent",
            populate:{
                path:"SubSection"
            }
        });

        let timeDurationObj = {};
        instructorCourses.forEach((course) => {
            let totalDurationInSeconds = 0;
            course.CourseContent.forEach((content) => {
                content.SubSection.forEach((SubSec) => {
                    const timeDurationInSeconds = parseInt(SubSec.TimeDuration);
                    totalDurationInSeconds += timeDurationInSeconds
                })
            })
            const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            timeDurationObj[course._id] = totalDuration;
        })


        res.status(200).json(
            {
                success:true,
                data:{
                    instructorCourses,
                    timeDurationObj,
                },
                message:"All Instructor Courses are fetched successfully"
            }
        )

    }catch(err){
        console.log("Error in fetching instructor courses",err.message);
        res.status(500).json(
            {
                success:false,
                error: err.message,
                message:"Failed to fetch instructor courses"
            }
        )
    }
}



exports.deleteCourse = async(req,res) => {
    try{
        const {courseId} = req.body;

        const course = await CoursesModel.findById(courseId);

        if(!course){
            return res.status(400).json(
                {
                    success:false,
                    message:`Course not found by this id: ${courseId}`
                }
            )
        }

        //unenroll students
        const studentEnrolled = course.StudentEnrolled;
        for(const studentId of studentEnrolled){
            await UserModel.findByIdAndUpdate(studentId, {
                $pull: {Courses: courseId}
            })
        }

        // deleting section and sub section
        const courseSection = course.CourseContent;
        for(const sectionId of courseSection) {
            //delete sub section

            const section = await SectionModel.findById(sectionId);
            if(section){
                const subSection = section.SubSection;
                for(const subSectionId of subSection){
                    await SubSectionModel.findByIdAndDelete(subSectionId);
                }
            }

            await SectionModel.findByIdAndDelete(sectionId);
        }

        //remove ref from userModel
        const removeRef = await UserModel.updateMany({Courses: courseId}, {$pull: {Courses:courseId}});
        const removeRefFromCategory = await CategoryModel.updateOne({Course: courseId}, {$pull: {Course: courseId}});
        //remove ref from category model
        //delete course

        await CoursesModel.findByIdAndDelete(courseId);

        res.status(200).json(
            {
                success:true,
                message:"Course deleted successfully"
            }
        )

    }catch(err){
        console.log("Error in deleting course", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Error in deleting course"
            }
        )
    }
}