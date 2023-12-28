// src/useCases/auth/LoginUseCase.ts
import { create, findByMobileNumber, update } from '../../adapters/repositories/UserRepository';
import { response } from '../../adapters/services/ResponseService';
import { sendOtp } from '../../adapters/services/TwilioService';
import { generateOtp } from '../../utils';
const jwt = require('jwt-then')


async function loginWithMobile(mobileNumber, fullName) {
    const user = await findByMobileNumber(mobileNumber);
    let otp;

    if (!user) {
        otp = generateOtp();
        await create({ mobileNumber, OTP: otp, fullName });
    }
    else {
        otp = generateOtp();
        user.OTP = otp;
        await update(user);
    }

    // Send the OTP via SMS
    await sendOtp(mobileNumber, otp);
}


async function verifyOtp(mobileNumber, OTP, res) {

    try {
        const user = await findByMobileNumber(mobileNumber);

        if (!user) {
            response.error(res, "User not found")
        }
        else {
            if (user?.OTP === OTP) {
                const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECRET)
                user.token = token
                user.OTP = "",
                    await update(user)
                response.success(res, "OTP verified Successfully", user)
            }
            else {
                response.error(res, "Kindly enter valid OTP")
            }
        }
    }
    catch (e) {
        throw e
        console.log("Verify OTP useCase", e)
    }
}


export const loginUseCase = {
    loginWithMobile, verifyOtp
}




