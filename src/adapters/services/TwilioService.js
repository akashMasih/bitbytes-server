// src/adapters/services/TwilioService.ts
import { Twilio } from 'twilio'



export async function sendOtp(mobileNumber, otp) {

    const client = new Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    )

    try {
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            to: `+91${mobileNumber}`,
            from: process.env.TWILIO_PHONE_NUMBER ? process.env.TWILIO_PHONE_NUMBER : '',
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
}

