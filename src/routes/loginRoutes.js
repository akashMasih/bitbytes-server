// src/routes/chatRoutes.ts
import express from 'express';
import { authController } from '../adapters/controllers/authController.js'

const loginRoutes = express.Router();


// API endpoint to send a message
loginRoutes.post('/login', authController.loginWithMobile);
loginRoutes.post('/verify-otp', authController.verifyOTP);

export default loginRoutes;
