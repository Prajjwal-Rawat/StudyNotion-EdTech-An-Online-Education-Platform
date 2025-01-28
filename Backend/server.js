const express = require("express");
const app = express();
require("dotenv").config();

const Port = process.env.PORT || 4000;

//routes
const userRoutes = require("./Routes/UserRoutes");
const coursesRoutes = require("./Routes/CoursesRoutes");
const paymentRoutes = require("./Routes/PaymentRoutes");
const contactRoutes = require("./Routes/ContactRouter");
const profileRoutes = require("./Routes/ProfileRoutes");

//config
const {connectCloudinary} = require("./Config/Cloudinary");
const {DBconnection} = require("./Config/DBConnection");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");


//connections
DBconnection();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://study-notion-ed-tech-an-online-education-platform.vercel.app",
    credentials:true
}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));

//route-middleware
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", coursesRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/profile", profileRoutes);


app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running.."
    })
});


app.listen(Port, () => {
    console.log(`Server is running at ${Port}`);
})



