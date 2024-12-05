const express = require("express");
const routes = express.Router();


const {OtpGenerator, SignUp, Login, ChangePassword} = require("../Controllers/AuthController");

const {resetPasswordToken, resetpassword} = require("../Controllers/ResetPass");

const {Auth} = require("../Middlewares/AuthMiddleware");


//routes

routes.post("/signUp", SignUp);
routes.post("/login", Login);
routes.post("/sendOtp", OtpGenerator);
routes.put("/changePassword", Auth, ChangePassword);


// reset password routes

routes.post("/reset-password-token", resetPasswordToken);
routes.post("/resetPassword", resetpassword);

module.exports = routes;