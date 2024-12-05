const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Course: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CoursesModel"
        }
    ]
})


module.exports = mongoose.model("CategoryModel", CategorySchema)