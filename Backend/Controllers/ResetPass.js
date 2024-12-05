const UserModel = require("../Models/UserModel");
const validate = require("validator");
const { SendMail } = require("../Utils/SendMail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


//reset password token

exports.resetPasswordToken = async(req,res) => {
    try{
        //fetch email
        const { Email } = req.body;
        //validate email
        const isEmailValid = validate.isEmail(Email);

        if(!isEmailValid){
            return res.status(400).json(
                {
                    success:false,
                    message:"Email is not valid, Please enter a valid email address"
                }
            )
        }

        // checking for email in db

        const isEmailPresent = await UserModel.findOne({Email});

        if(!isEmailPresent){
            return res.status(404).json(
                {
                    success:false,
                    message:"Email not found, Please create a account first, SignIn to StudyNotion"
                }
            )
        }


        //token generate

        const token = crypto.randomUUID();
        console.log("Token generated for reset password -> ", token);

        //db entry of token

        const UpdatedEntry = await UserModel.findOneAndUpdate({Email}, {Token:token, ExpiresIn: Date.now() + 5*60*1000}, {new:true});

        //front end url
        const url = `http://localhost:3000/reset-password/${token}`

        //send mail with link

        const mailResponse = SendMail(Email, "(StudyNotion) Reset Password Link", `<h1>Link for your reset password </h1> <p> Click on this link
            to reset your password ${url} </p> <p> Please do not share this link to anyone </p>`);

        res.status(200).json(
            {
                success:true,
                message:"Reset password link sent successfully"
            }
        )

    }catch(err){
        console.log("Error in sending the mail or generating the token for reset password");

        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal error while sending the mail for reset password, please try again"
            }
        )

    }
}




//reset password in db


exports.resetpassword = async(req,res) => {
    try{

        //fetch the data password confirm password and token 

        const {Password, confirmPassword, token} = req.body;         // so req ki body mai token humne front-end mai nikala hoga url parameter mai se then send kia hoga usko req ki body mai

        if(!Password || !confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please provide a strong password, Field should not be empty"
                }
            )
        }

        //validate password and confirm password

        if(Password !== confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Your password and confirm password doesn't match"
                }
            )
        }
        // fetch details of user by token
        const user = await UserModel.findOne({Token:token});

        if(!user){
            return res.status(404).json(
                {
                    success:false,
                    message:"Token is invalid or missing, Please try again"
                }
            )
        }

        // or check the expiration time of token 
        if(user.ExpiresIn < Date.now()){
            return res.status(400).json(
                {
                    success:false,
                    message:"Token is expired, Please try again"
                }
            )
        }

        // hash password 

        const hashPassword = await bcrypt.hash(Password, 10);

        //update password in db
        user.Password = hashPassword;
        await user.save();

        res.status(200).json(
            {
                success:true,
                message:"Password Reset successfully"
            }
        )

    }catch(err){

        console.log("Got Some error while reseting the password");
        res.status(500).json(
            {
                success:false,
                error:err.message,
                message:"Internal Error while reseting the password"
            }
        )
    }
}