const SubSectionModel = require("../Models/SubSectionModel");
const SectionModel = require("../Models/SectionModel");
const CoursesModel = require("../Models/CoursesModel");
const { FilesUpload } = require("../Utils/FilesUpload");
const mongoose = require("mongoose");
require("dotenv").config();


//create subSection

exports.createSubSection = async(req,res) => {
    try{
        const {Title, Description, sectionId} = req.body;

        const video = req.files.videoFile;

        //validate
        if(!Title || !Description || !sectionId || !video){
            return res.status(400).json(
                {
                    success:false,
                    message:"Some properties are missing"
                }
            )
        }
        
        //upload video
        const videoUpload = await FilesUpload(video,process.env.FOLDER_NAME);

        //DBEntry
        const SubSectionEntry = await SubSectionModel.create({
            Title,
            TimeDuration: videoUpload.duration,
            Description,
            VideoUrl:videoUpload.secure_url
        })

        //update section
        const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, {$push:{SubSection:SubSectionEntry._id}}, {new:true})
        .populate("SubSection");

        if(!updatedSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"Section Not Found, Failed to Update SubSection into Section"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                message:"Sub Section created successfully",
                updatedSection
            }
        )

    }catch(err){
        console.log("Got some Error while creating SubSection");
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error while creating SubSection, Please try again"
            }
        )
    }
}


//Update SubSection 


exports.UpdateSubSection = async(req,res) => {
    try{
        const {subSectionId, sectionId} = req.body;

        if(!subSectionId){
           return res.status(400).json(
            {
                success:false,
                message:"Sub-Section-Id is missing"
            }
           )
        }

        //optional data
        const {Title, Description, TimeDuration} = req.body;

        const UpdatedVideo = req.files? req.files.videoFile : null;  // so if there is any file in req.files it will fetch video otherwise it will be null

        //conditionally checking 
        let updatedData = {};
        if(Title) updatedData.Title = Title;
        if(Description) updatedData.Description = Description;
        if(TimeDuration) updatedData.TimeDuration = TimeDuration;

        //conditional check for video upload
        if(UpdatedVideo){
            const UpdatedVideoUpload  = await FilesUpload(UpdatedVideo,process.env.FOLDER_NAME);
            updatedData.VideoUrl = UpdatedVideoUpload.secure_url;
            updatedData.TimeDuration = UpdatedVideoUpload.duration;
        }

        //checking if payload if empty -- if user didn't give anything 
        if(Object.keys(updatedData).length === 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"No fields to update. Please provide at least one field."
                }
            )
        }

        //update on db

        const UpdatedSubSection = await SubSectionModel.findByIdAndUpdate(subSectionId,updatedData,{new:true});

        if(!UpdatedSubSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"Sub-Section not found"
                }
            )
        }

        const updatedSection = await SectionModel.findById(sectionId).populate("SubSection");

        res.status(200).json(
            {
                success:true,
                message:"Sub-Section updated Successfully",
                updatedSection
            }
        )

    }catch(err){
      console.log("Got Some Error in Update-Sub-Section ",err.message);
      res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Internal Server Error In Updation of Sub-Section"
        }
      )
    }
}




//Delete Sub Section


exports.DeleteSubSection = async(req,res) => {
    try{
        const {subSectionId, courseId} = req.body;

        if(!subSectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Sub-Section-Id is missing"
                }
            )
        }

        const deletedSubSection = await SubSectionModel.findByIdAndDelete(subSectionId);
        if(!deletedSubSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"Sub-Section not found"
                }
            )
        }

        
        const deleteRef = await SectionModel.updateMany({SubSection:subSectionId}, {$pull:{SubSection:subSectionId}});

        if(deleteRef.modifiedCount === 0){
            console.log("No section is referencing this sub-Section");
        }

        const updatedCourse = await CoursesModel.findById(courseId)
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
                message:"Sub-Section deleted successfully"
            }
        )

        
    }catch(err){
        console.log("Got some error in Deleting Sub-Section", err.message);
        res.status(500).json(
            {
                success:false,
                message:"Internal Server Error in Deleting Sub-Section, Please try again"
            }
        )
    }
}