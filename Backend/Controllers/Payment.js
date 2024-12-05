const {instance} = require("../Config/Razorpay");
const {SendMail} = require("../Utils/SendMail");
const CoursesModel = require("../Models/CoursesModel");
const UserModel = require("../Models/UserModel");
const CourseProgressModel = require("../Models/CourseProgressModel");
const crypto =  require("crypto");
require("dotenv").config();




exports.capturePayment = async(req,res) => {
    const {coursesId} = req.body;
    const userId = req.user.id;

    if(coursesId.length === 0){
        return res.status(400).json(
            {
                success:false,
                message:"Please Provide course Id"
            }
        )
    }

    let totalAmount = 0;

    for(const course_id of coursesId){
        let course;
        try{
            course = await CoursesModel.findById(course_id);
           if(!course){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course Not Found"
                }
            )
           }


           if(course.StudentEnrolled.includes(userId)){
            return res.status(400).json(
                {
                    success:false,
                    message:"Student is already Enrolled in course"
                }
            )
           }

           totalAmount += course.Price;
        }catch(err){
            return res.status(500).json(
                {
                    success:false,
                    message:err.message
                }
            )
        }
    }

    //create order
    try{
        const paymentResponse = await instance.orders.create({
            amount:totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        });

        res.status(200).json(
            {
                success:true,
                data: paymentResponse,
                message: "Payment order created successfully" 
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                error: err.message,
                message: "Could not Initiate payment order"
            }
        )
    }
}



//verify payment 
exports.verifyPayment = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const coursesId = req.body?.coursesId;
    const userId = req.user.id;


    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !coursesId || !userId){
        return res.status(400).json(
            {
                success:false,
                message:"Payment Failed"
            }
        )
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");

    if(expectedSignature === razorpay_signature){
        //enroll student
        await enrollStudents(coursesId, userId, res);

        return res.status(200).json(
            {
                success:true,
                message:"Payment Verified"
            }
        )
    }

    return res.status(502).json(
        {
            success:false,
            message:"Payment Failed, Could not verify payment"
        }
    )
}


const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId){
        return res.status(400).json(
            {
                success:false,
                message:"Please provide courses Id or invalid userId"
            }
        )
    }

    for(const course_Id of courses){
       try{
        const enrolledCourse = await CoursesModel.findByIdAndUpdate(course_Id, {$push:{StudentEnrolled:userId}}, {new:true}); 

        if(!enrolledCourse){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course Not Found"
                }
            )
        }

        const courseProgress = CourseProgressModel.create({
            courseID: course_Id,
            userId: userId,
            completedVideos: []
        });

        //find student and add enrolledcourse to user modal
        const studentEnrollInCourse = await UserModel.findByIdAndUpdate(userId, {$push: {Courses: course_Id, CourseProgress: (await courseProgress)._id}},{new:true});  

       }catch(err){
        console.log("Failed to update enrolled course or enroll student", err);
        return res.status(500).json(
            {
                success:false,
                message:err.message,

            }
        ) 
       }
    }
  
}


exports.sendPaymentEmail = async (req,res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;
    
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json(
            {
                success:false,
                message:"Please provide all the fields"
            }
        )
    }

    try{
        const EnrollstudentData = await UserModel.findById(userId);

        await SendMail(EnrollstudentData.Email, 
            "(StudyNotion) Payment Received", 
            `<p>Dear ${EnrollstudentData.FirstName} ${EnrollstudentData.LastName}</p>
            <p>We have received a payment of ${amount/100}</p>
            <p>Your Payment ID is ${paymentId}</p>
            <p>Your order ID is ${orderId}</p>
            <div>If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>`
        );

    }catch(err){
        console.log("Error in sending mail", err);
        return res.status(500).json(
            {
                success:false,
                message:"Failed to send mail"
            }
        )
    }
}