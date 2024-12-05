const UserModel = require("../Models/UserModel");
const validate = require("validator");
const { authenticator } = require("otplib");
const OtpModel = require("../Models/OtpModel");
const bcrypt = require("bcrypt");
const ProfileModel = require("../Models/ProfileModel");
const jwt = require("jsonwebtoken");
const { SendMail } = require("../Utils/SendMail");
const { default: mongoose } = require("mongoose");

//otp generator

exports.OtpGenerator = async (req, res) => {
    try {
        const { Email } = req.body;

        // validate email
        const isvalidate = validate.isEmail(Email);

        if (!isvalidate || Email.split(".").pop() !== "com") {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email is not valid, Please Enter the valid email"
                }
            )
        }

        //checking for email in db if already exist 

        const isExists = await UserModel.findOne({ Email });

        if (isExists) {
            return res.status(400).json(
                {
                    success: false,
                    message: "This email already exists, Please login or try with different Email Address"
                }
            )
        }

        // generating otp

        const secret = authenticator.generateSecret();
        const token = authenticator.generate(secret);


        //otp entry in DB

        const OtpEntry = await OtpModel.create({ Email, OTP: token, Secret: secret });

        res.status(200).json(
            {
                success: true,
                message: "OTP send successfully"
            }
        )


    } catch (err) {
        console.log("Error occured while generating otp ");
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while generating OTP"
        })
    }
}




//Sign Up controller

exports.SignUp = async (req, res) => {

    try {


        // fetch data

        const { FirstName, LastName, Email, MobileNo, Password, AccountType, ConfirmPassword, UserOtp } = req.body;

        //validate

        if (!FirstName || !LastName || !Email || !MobileNo || !Password || !ConfirmPassword) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Please fill all the details"
                }
            )
        }

        //confirm password matching

        if (Password !== ConfirmPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password doesn't match to confirm password, Please try again",
                }
            )
        }


        // validate Email

        const isValidEmail = validate.isEmail(Email);

        if (!isValidEmail) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email is not valid, Please enter a valid email address"
                }
            )
        }


        // check if email is already exists

        const isEmailPresent = await UserModel.findOne({ Email });

        if (isEmailPresent) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email already exists, Please LogIn or use different email address"
                }
            )
        }


        //find secret key

        const OtpDocument = await OtpModel.findOne({ Email });

        if (!OtpDocument) {
            return res.status(404).json(
                {
                    success: false,
                    message: "OTP not found. Please request a new OTP."
                }
            )
        }


        //validate otp that is send by the user

        const isOtpValid = UserOtp === OtpDocument.OTP;

        if (!isOtpValid) {
            return res.status(400).json(
                {
                    success: false,
                    message: "OTP does not match"
                }
            )
        }


        // hash password 

        const hashPassword = await bcrypt.hash(Password, 10);

        //profileModel data

        const profileDetailes = await ProfileModel.create({
            Gender: null,
            DateOfBirth: null,
            About: null,
            Profession: null,
        })


        // creating entry in db

        const DBEntry = await UserModel.create({
            FirstName,
            LastName,
            Email,
            MobileNo,
            Password: hashPassword,
            AccountType,
            AdditionalDetails: profileDetailes._id,
            UserImageUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`,
        })


        res.status(200).json(
            {
                success: true,
                data:DBEntry,
                message: "Account Created Successfully, Please LoginIn"
            }
        )

    } catch (err) {
        console.log("Something went wrong While SignUp");
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "User can not be registered, Please try again later"
            }
        )
    }

}




//Login Controller

exports.Login = async (req, res) => {
    try {
        //fetch data
        const { Email, Password } = req.body;

        //validate data
        if (!Email || !Password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please fill all the details"
                }
            )
        }

        //validate Email
        const isValidEmail = validate.isEmail(Email);

        if (!isValidEmail) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please enter the valid Email Address"
                }
            )
        }


        //validate email if email is present or not
        const user = await UserModel.findOne({ Email }).populate("AdditionalDetails");

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Email does not found, Please signUp first"
                }
            )
        }

        //validate password
        if (await bcrypt.compare(Password, user.Password)) {

            //generate jwt 
            const payload = {
                Email: user.Email,
                id: user._id,
                AccountType: user.AccountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3h",
            })

            user.Token = token;
            user.Password = undefined;


            // send cookie response with jwt
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("Token", token, options).json(
                {
                    success: true,
                    token,
                    user,
                    message: "Logged In successfully"
                }
            )
        } else {
            res.status(400).json(
                {
                    success: false,
                    message: "Password Invalid, Please enter the correct password"
                }
            )
        }

    } catch (err) {
        console.log("Login failure");
        console.error(err);
        res.status(500).json(
            {
                success: false,
                error: err.message,
                message: "Loggin failure, Please try again"
            }
        )
    }
}



// Change password 

exports.ChangePassword = async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;

        // validation
        const user = await UserModel.findById(req.user.id);


        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        //validation of old password

        const isPasswordMatch = await bcrypt.compare(OldPassword, user.Password);

        if (!isPasswordMatch) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Old password is incorrect"
                }
            )
        }


        const hashNewPass = await bcrypt.hash(NewPassword, 10);
        user.Password = hashNewPass;
        await user.save();


        try{

            const mailBody = `<h1>Your password is changed successfully </h1> <p>	
            This is a confirmation mail that the password for your StudyNotion account ${user.FirstName} ${user.LastName} has just been changed. </p>`
            
            const mailResponse = await SendMail(user.Email, "Your StudyNotion password has been changed", mailBody);
            console.log("Successfully send mail for changing password");
            console.log("password change mail response -> ", mailResponse);
            
        }catch(err){
            console.log("Error in sending mail of change password");
        }


        res.status(200).json(
            {
                success: true,
                message: "Password Changed Successfully"
            }
        )


    } catch (err) {
       console.log("Error in changing password", err.message);
       res.status(500).json(
        {
            success:false,
            message:"Server error Password didn't changed, Please try again"
        }
       )
    }
    
}

