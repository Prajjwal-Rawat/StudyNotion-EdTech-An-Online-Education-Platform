const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        FirstName: {
            type:String,
            required:true,
            trim:true
        },

        LastName: {
            type:String,
            required:true,
            trim:true
        },

        Email:{
            type:String,
            required:true,
            trim:true
        },

        MobileNo: {
            type:Number,
            required:true
        },

        Password:{
            type:String,
            required:true
        },

        UserImageUrl:{
            type:String
        },

        AccountType:{
            type:String,
            enum:["Admin", "Student", "Instructor"],
            required:true
        },

        Token:{
            type:String
        },

        ExpiresIn:{
            type:Date
        },

        AdditionalDetails: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"ProfileModel"
        },

        Courses: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CoursesModel"
            }
        ],
        
        CourseProgress:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CourseProgressModel"
            }
        ]
    }
)


module.exports = mongoose.model("UserModel", UserSchema);