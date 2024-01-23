// src/useCases/auth/LoginUseCase.ts
const userRepository = require('../../adapters/repositories/UserRepository.js');
const response = require('../../adapters/services/ResponseService.js');
const sendOtp = require('../../adapters/services/TwilioService.js');
const { generateOtp } = require('../../utils/index.js');
const jwt = require('jwt-then');


async function loginWithMobile(mobileNumber, fullName) {
    const user = await userRepository.findByMobileNumber(mobileNumber);
    let otp;

    if (!user) {
        otp = generateOtp();
        console.log("OTP", otp)
        await userRepository.create({ mobileNumber, OTP: otp, fullName });
    }
    else {
        otp = generateOtp();
        user.OTP = otp;
        await userRepository.update(user);
    }

    // Send the OTP via SMS
    await sendOtp(mobileNumber, otp);
}


async function verifyOtp(mobileNumber, OTP, res) {

    try {
        const user = await userRepository.findByMobileNumber(mobileNumber);

        if (!user) {
            response.error(res, "User not found")
        }
        else {
            if (user?.OTP === OTP) {
                const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECRET)
                user.token = token
                user.OTP = "",
                    await userRepository.update(user)
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

const loginUseCase = {
    loginWithMobile, verifyOtp
}

module.exports = loginUseCase




