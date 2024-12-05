const mongoose = require("mongoose");


const CoursesSchema = new mongoose.Schema({
    CourseName: {
        type: String,
        required: true,
        trim: true
    },
    CourseDescription: {
        type: String,
        required: true,
        trim: true
    },
    Instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    Language: {
        type: String,
        required: true
    },
    WhatYouWillLearn: {
        type: String,
    },
    CourseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SectionModel"
        }
    ],
    RatingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReviewModel"
        }
    ],
    Price: {
        type: Number,
        required: true
    },
    Thumbnail: {
        type: String
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CategoryModel",
        required:true
    },
    Tags: {
        type:[String]
    },
    StudentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],
    instructions:{
        type:[String]
    },
    status:{
        type:String,
        enum: ["Draft", "Published"]
    },
    createdAt: {
		type:Date,
		default:Date.now
	},
})


module.exports = mongoose.model("CoursesModel", CoursesSchema);