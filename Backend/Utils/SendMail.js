const nodemailer = require("nodemailer");
require("dotenv").config();


exports.SendMail = async(email, subject, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"Study Notion",
            to:`${email}`,
            subject:`${subject}`,
            html:`${body}`
        })
        return info;
        
    }catch(err){
        console.log("Error occured while sending the Email");
        console.error(err);
    }
}