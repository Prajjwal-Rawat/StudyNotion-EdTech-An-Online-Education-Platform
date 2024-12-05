const mongoose = require("mongoose");


const SectionSchema = new mongoose.Schema({
    SectionTitle:{
        type:String,
        required:true,
        trim:true
    },
    SubSection:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSectionModel",
        required:true
       }
    ]
})


module.exports = mongoose.model("SectionModel", SectionSchema);