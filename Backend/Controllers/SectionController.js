const SectionModel = require("../Models/SectionModel");
const CoursesModel = require("../Models/CoursesModel");
const SubSectionModel = require("../Models/SubSectionModel");
const { default: mongoose } = require("mongoose");


exports.createSection = async(req,res) => {
    try{
        // fetch the name of the section
        const {SectionTitle, courseId} = req.body;

        if(!SectionTitle || !courseId){
            return res.status(400).json(
                {
                   success:false,
                   message:"Either CourseId or Section-Title is missing"
                }
            )
        }

        //update in db in section model
        const SectionEntry = await SectionModel.create({SectionTitle});
        console.log("section updated entry", SectionEntry);

        //update coursesmodel section
        const updatedCourseDetail = await CoursesModel.findByIdAndUpdate(courseId, {$push:{CourseContent:SectionEntry._id}},{new:true})
        .populate({
            path: "CourseContent",
            populate:{
                path: "SubSection"
            }
        }).exec();

        if(!updatedCourseDetail){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course not found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                updatedCourseDetail,
                message:"Section created successfully"
            }
        )

    }catch(err){
       console.log("Got error in createSection", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Internal Server Error while creating section of course"
        }
       )
    }
}


// updateSection

exports.updateSection = async(req,res) => {
    try{
        const {sectionId, SectionTitle, courseId } = req.body;

        if(!sectionId || !SectionTitle){
            return res.status(400).json(
                {
                    success:false,
                    message:"Either SectionId or SectionTitle is missing"
                }
            )
        }

        //update in db
        const UpdatedSection = await SectionModel.findByIdAndUpdate(sectionId, {SectionTitle}, {new:true});

        if(!UpdatedSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"Section not found, Failed to update"
                }
            )
        }

        const course = await CoursesModel.findById(courseId)
		.populate({
			path:"CourseContent",
			populate:{
				path:"SubSection",
			},
		})
		.exec();

        res.status(200).json(
            {
                success:true,
                data: course,
                message:"Section Details is updated successfully"
            }
        )
    }catch(err){
        console.log("Got error in UpdateSection");

        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error while updating Section Details, Please check your sectionId and try again"
            }
        )
    }
}


//delete section

exports.deleteSection = async(req,res) => {
    try{
        // assuming we are fetching sectionId from parameters
        const {sectionId, courseId}  = req.body;

        if(!sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Section Id is missing"
                }
            )
        }

        const section = await SectionModel.findById(sectionId);
        if(!section){
            return res.status(404).json(
                {
                    success:false,
                    message:"Section not found"
                }
            )
        }

        await SubSectionModel.deleteMany({_id: {$in: section.SubSection}});
        await section.deleteOne();

        //removing section reference also in coursesModel
        const removeRef = await CoursesModel.updateMany({CourseContent:sectionId}, {$pull:{CourseContent:sectionId}});

        const updatedCourse = await CoursesModel.findById(courseId)
        .populate({
            path: "CourseContent",
            populate:{
                path: "SubSection"
            }
        }).exec();

        if(removeRef.modifiedCount === 0){
            console.log("No Course is referencing this Section");
        }
    
        res.status(200).json(
            {
                success:true,
                data:updatedCourse,
                message:"Section and its reference Deleted successfully"
            }
        )
        
    }catch(err){
        console.log("Got Error in DeletingSection", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Error Unable to delete section, Please try again"
            }
        )
    }
}