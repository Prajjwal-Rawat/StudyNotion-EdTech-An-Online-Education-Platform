const mongoose = require("mongoose");
require("dotenv").config();


exports.DBconnection = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database is connected successfully");
    }).catch((err) => {
        console.log("DB connection failed");
        console.error(err);
        process.exit(1);
    })
}