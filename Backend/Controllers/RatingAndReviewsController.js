const RatingAndReviewsModel = require("../Models/Rating&ReviewsModel");
const UserModel = require("../Models/UserModel");
const CoursesModel = require("../Models/CoursesModel");
const { default: mongoose } = require("mongoose");



//create ratings and reviews

exports.createRatings = async(req,res) => {
    try{
        //fetch details like userId, CourseId and other details
        
        const userId = req.user.id;
        const {courseId, Rating, Review} = req.body;
        //validate
        if(!userId || !courseId || !Rating || !Review){
            return res.status(400).json(
                {
                    success:false,
                    message:"Some fields are missing"
                }
            )
        }
        //check if user is enrolled on that course or not  
        const CourseDetails = await CoursesModel.findOne({_id:courseId, StudentEnrolled:{$elemMatch: {$eq:userId}}});

        if(!CourseDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"Student is not enrolled in this course or course not found"
                }
            )
        }
        //check if user already given the rating and review or not
        const isAlreadyReviewed = await RatingAndReviewsModel.findOne({User:userId, course:courseId});

        if(isAlreadyReviewed){
            return res.status(403).json(
                {
                    success:false,
                    message:"Course is already reviewed by user"
                }
            )
        }
        //entry rating and review
        const ratingReview = await RatingAndReviewsModel.create({
            Rating,
            Review,
            User:userId,
            course:courseId
        });

        //entry in courseModel
        await CoursesModel.findByIdAndUpdate(courseId, {$push:{RatingAndReviews:ratingReview._id}});

        res.status(200).json(
            {
                success:true,
                message:"Rating And Review is added successfully",
                ratingReview
            }
        )

    }catch(err){
      console.log("Error in creating Rating And Review ", err.message);
      res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Error in creating Rating And Review"
        }
      )
    }
}


//getAverage Rating

exports.getAverageRating = async(req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"CourseId is missing "
                }
            )
        }

        const average = await RatingAndReviewsModel.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId)
                },
                $group:{
                    _id:null,
                    averageRating: {$avg: "$Rating"}
                }
            }
        ]);

        if(average.length > 0){
            return res.status(200).json(
                {
                    success:true,
                    averageRating: average[0].averageRating
                }
            )
        }

        return res.status(200).json(
            {
                success:true,
                message:"Average Rating is 0, no rating given till now"
            }
        )
    }catch(err){
        console.log("error in finding average rating ",err.message);
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Could not find average rating"
            }
        )
    }
}





// get all rating and reviews


exports.getAllRatings = async(req,res) => {
    try{
        const allRatingsAndReviews = await RatingAndReviewsModel.find({})
                                                                .sort({Rating: -1}) 
                                                                .populate({
                                                                    path:"User",
                                                                    select: "FirstName LastName Email UserImageUrl"
                                                                })
                                                                .populate({
                                                                    path:"course",
                                                                    select: "CourseName"
                                                                }).exec();
        
        if(!allRatingsAndReviews){
            return res.status(404).json(
                {
                    success:false,
                    message:"Rating and reviews not found"
                }
            )
        }

        res.status(200).json(
            {
                success:true,
                message:"All Rating And Reviews are fetched",
                data: allRatingsAndReviews
            }
        )
    }catch(err){
        console.log("Error in fetching rating and reviews");
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Error in fetching Rating and Reviews"
            }
        )

    }
}

