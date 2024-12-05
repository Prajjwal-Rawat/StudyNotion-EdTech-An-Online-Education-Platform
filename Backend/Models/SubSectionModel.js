const mongoose = require("mongoose");


const SubSectionSchema = new mongoose.Schema({
    Title:{
        type:String,
        trim:true
    },
    TimeDuration: {
        type:String
    },
    Description: {
        type:String,
        trim:true
    },
    VideoUrl:{
        type:String
    }
})


module.exports = mongoose.model("SubSectionModel", SubSectionSchema);