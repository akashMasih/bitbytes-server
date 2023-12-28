// src/routes/chatRoutes.ts
const express = require('express');
const authController = require('../adapters/controllers/authController')

const loginRoutes = express.Router();


// API endpoint to send a message
loginRoutes.post('/login', authController.loginWithMobile);
loginRoutes.post('/verify-otp', authController.verifyOTP);

module.exports = loginRoutes;
