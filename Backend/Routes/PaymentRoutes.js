const express = require("express");
const routes = express.Router();


const {capturePayment, verifyPayment, sendPaymentEmail} = require("../Controllers/Payment");
const {Auth, isStudent} = require("../Middlewares/AuthMiddleware");


routes.post("/capturePayment", Auth, isStudent, capturePayment);
routes.post("/verifySignature", Auth, isStudent, verifyPayment);
routes.post("/sendPaymentMail", Auth, sendPaymentEmail);

module.exports = routes;