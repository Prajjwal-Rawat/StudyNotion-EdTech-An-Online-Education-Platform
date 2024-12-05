const mongoose = require("mongoose");


const CourseProgressSchema = new mongoose.Schema({
    courseID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CoursesModel"
    },
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "UserModel"
    },
    completedVideos: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSectionModel"
        }
    ]
})


module.exports = mongoose.model("CourseProgressModel", CourseProgressSchema);