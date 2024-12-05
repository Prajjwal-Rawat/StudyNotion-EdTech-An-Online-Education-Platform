const CourseProgressModel = require("../Models/CourseProgressModel");
const SubSectionModel = require("../Models/SubSectionModel");


exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        const subSection = await SubSectionModel.findById(subSectionId);

        if(!subSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"Invalid Sub Section, Sub Section Not Found"
                }
            )
        }

        const courseProgress = await CourseProgressModel.findOne({
            courseID: courseId,
            userId: userId
        });


        if(!courseProgress){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course Progress does not exit"
                }
            )
        }else{

            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(208).json(
                    {
                      success:false,
                      message:"Lecture is already completed"
                    }
                )
            }

            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();

        res.status(200).json(
            {
                success:true,
                data:courseProgress,
                message:"Lecture is marked as completed successfully"
            }
        )
    } catch (err) {
        console.log("Failed to mark lecture as completed ", err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Failed to mark lecture as completed"
            }
        )
    }
}