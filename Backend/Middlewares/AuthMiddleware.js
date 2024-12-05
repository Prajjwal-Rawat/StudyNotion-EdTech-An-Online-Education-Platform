const jwt = require("jsonwebtoken");
require("cookie-parser");
require("dotenv").config();



// Auth jwt

exports.Auth = async(req, res, next) => {
    try{
        const token = req.cookies.Token || req.header("Authorization").replace("Bearer ", "") || req.body.Token;

        if(!token){
            return res.status(404).json(
                {
                    success:false,
                    message:"Token is missing"
                }
            )
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;
    
        }catch(err){

            console.log("Token is not verified", err);
            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid Token, Issue in verification of token"
                }
            )
        }

        next();

    }catch(err){
        console.log("error in token verification");
        res.status(500).json(
            {
                success:false,
                error: err.message,
                message:"Error in token validation"
            }
        )
    }
}

// isStudent 

exports.isStudent = async(req, res, next) => {
    try{
         
        if(req.user.AccountType !== "Student"){
            return res.status(400).json(
                {
                    success:false,
                    message:"This is protected route, Only student can access"
                }
            )
        }

        next();

    }catch(err){
      res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"User role can not be verified, Please try again"
        }
      )
    }
}

//isInstructor

exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.AccountType !== "Instructor"){
            return res.status(400).json(
                {
                    success:false,
                    message:"This is protected route, Only Instructor can access"
                }
            )
        }

        next();

    }catch(err){
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"User role can not be verified, Please try again"
        }
       )
    }
}

//isAdmin

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.AccountType !== "Admin"){
            return res.status(400).json(
                {
                    success:false,
                    message:"This is protected route, Only Admin can access"
                }
            )
        }

        next();

    }catch(err){
       res.status(500).json(
        {
            success:false,
            error:err.message,
            message:"User role can not be verified, Please try again"
        }
       )
    }
}