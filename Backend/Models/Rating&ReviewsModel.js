const mongoose = require("mongoose");


const RatingAndReviewSchema = new mongoose.Schema({

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    Rating: {
        type: Number,
    },
    Review: {
        type: String,
        trim: true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"CoursesModel",
        index:true
    }
})

module.exports = mongoose.model("RatingAndReviewModel", RatingAndReviewSchema);