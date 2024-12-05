const mongoose = require("mongoose");
const { SendMail } = require("../Utils/SendMail");



const OTPSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    Secret: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    }
})

async function verificationMail(email, otp) {
    try {
        const body = `<h1>One Time Password (OTP) for your verification</h1> <p>Dear user this is your one time password(OTP) for the verication ${otp}</p>
        <p> Please do not share this </p> <p> This will only be validate for 5 minutes and expires after that </p>`

        const mailResponse = await SendMail(email, "(Study Notion) Verification Mail ", body);
        console.log("Email send Successfully MailResponse", mailResponse);
        
    } catch (err) {
        console.log("Error in Verification mail", err.message);
        throw new Error("Failed to Send verification Email");
    }
}

OTPSchema.pre("save", async function (next) {
    try {

        await verificationMail(this.Email, this.OTP);
        next();

    } catch (err) {
        next(err);
    }
})

module.exports = mongoose.model("OTPModel", OTPSchema);