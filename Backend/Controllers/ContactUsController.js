const {SendMail} = require("../Utils/SendMail");
require("dotenv").config();




exports.contactUs = async(req,res) => {
    try{
        const {firstName, lastName, email, phoneNumber, message} = req.body;

        if(!firstName || !email || !phoneNumber || !message){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required"
                }
            )
        }

        const mailInfo = await SendMail(process.env.MAIL_USER, `(StudyNotion) ${email} trying to connect with you`, `<p> FirstName: ${firstName} </p>
                                                                <p> LastName: ${lastName} </p> <p> PhoneNumber: ${phoneNumber} </p> Message: ${message}`);

        if(mailInfo){
            console.log("Mail send successfully to StudyNotion for connect with user")
        }

        const mailResponse = SendMail(email, `(StudyNotion) We Got Your Mail`, `Hi ${firstName} ${lastName} we got you message we will connect with you soon, Thanku for contacting Us`)

        if(mailResponse){
            console.log("Mail send successfully to user that we got you message");
        }

        res.status(200).json(
            {
                success:true,
                message:"Mail send successfully"
            }
        )
    }catch(err){
       console.log("Error in contacting ",err.message);
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"Error in contacting with user"
        }
       )
    }
}