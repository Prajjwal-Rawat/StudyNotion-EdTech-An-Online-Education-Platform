const express = require("express");
const routes = express.Router();


const {contactUs} = require("../Controllers/ContactUsController");


routes.post("/contactUs", contactUs)

module.exports = routes;