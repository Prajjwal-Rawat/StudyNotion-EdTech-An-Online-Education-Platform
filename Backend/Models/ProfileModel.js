const mongoose = require("mongoose");


const ProfileSchema = new mongoose.Schema({
    Gender:{
        type:String,
    },
    DateOfBirth:{
        type:String,
    },
    About:{
        type:String,
        trim:true
    },
    Profession:{
        type:String
    },
})


module.exports = mongoose.model("ProfileModel", ProfileSchema);