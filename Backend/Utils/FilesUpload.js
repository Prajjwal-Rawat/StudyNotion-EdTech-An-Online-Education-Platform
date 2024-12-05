const cloudinary = require("cloudinary").v2;



exports.FilesUpload = async(file, folder) => {
    try{

        // const isVideo = file.mimetype && file.mimetype.startsWith("video");

        // const transformation = isVideo
        //     ? { quality }  
        //     : { width, height, quality };

        return await cloudinary.uploader.upload(file.tempFilePath,{
            folder:folder,
            public_id: file.name.split(".")[0],
            resource_type: "auto",
            transformation:{
                quality: "auto"
            }
        })
    }catch(err){
        console.log("Error during file upload ", err.message);
        throw new Error("File upload failed");
    }
}