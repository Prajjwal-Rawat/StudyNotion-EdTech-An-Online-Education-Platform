const CategoryModel = require("../Models/CategoryModel");
const CoursesModel = require("../Models/CoursesModel");



//Create Category

exports.createCategory = async (req, res) => {
    try {
        const { Category, Description } = req.body;

        //validation
        if (!Category || !Description) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        //create entry
        const CategoryDetail = await CategoryModel.create({ Category, Description });
        console.log(CategoryDetail);

        res.status(200).json(
            {
                success: true,
                message: "Category Entry created successfully"
            }
        )

    } catch (err) {
        console.log("Got some error while creating Category ", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Internal Error while creating Category"
            }
        )
    }
}


// Get all categories

exports.ShowAllCategories = async (req, res) => {
    try {
        const AllCategories = await CategoryModel.find({}, { Category: true, Description: true });

        res.status(200).json(
            {
                success: true,
                Categories: AllCategories,
                message: "All Category are successfully fetched"
            }
        )

    } catch (err) {
        console.log("Got some error while fetching Categories ", err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Internal Error while fetching the Categories"
            }
        )
    }
}




// categoryPageDetails  -- showing search courses with top courses and best selling courses


exports.categoryPageDetails = async (req, res) => {
    try {

        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Missing category_Id"
                }
            )
        }

        const selectedCategory = await CategoryModel.findById(categoryId)
        .populate({
            path: "Course",
            match: {status: "Published"},
            populate: "RatingAndReviews",
            populate: "Instructor"
        }).exec();

        if (!selectedCategory) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Category Details not found"
                }
            )
        }

        if(selectedCategory.Course.length === 0){
            return res.status(404).json(
                {
                    success:false,
                    message:"No courses found for the selected category"
                }
            )
        }

        //other category of courses 

        const differentCategories = await CoursesModel.find({Category: categoryId}).sort({RatingAndReviews: -1}).limit(10).populate("Instructor").exec();
                                                    // _id: { $ne: categoryId }
                                                    // }).populate({
                                                    //     path: "Course",
                                                    //     match: {status: "Published"},
                                                    //     populate: "Instructor"
                                                    // }).exec();
        //top 10 selling courses
        const topSellingCourses = await CoursesModel.find({}).sort({StudentEnrolled: -1}).limit(10).populate("Instructor").exec();

        const newcourses = await CategoryModel.findOne({_id:categoryId})
                                                   .populate({
                                                    path:"Course",
                                                    match: {status: "Published"},
                                                    options: {sort: {createdAt: -1}, limit:10},
                                                    populate:{ 
                                                        path:"Instructor"
                                                    }
                                                   }).exec();

        if(!topSellingCourses){
            console.log("No top Selling courses");
        }

        res.status(200).json(
            {
                success:true,
                data:{
                    selectedCategory,
                    differentCategories,
                    newcourses,
                    topSellingCourses
                },
                message:"Successfully fetched category page details"
            }
        )

    } catch (err) {
       console.log("Error in finding category page details ", err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Internal Error in finding category page details."
        }
       )
    }
}