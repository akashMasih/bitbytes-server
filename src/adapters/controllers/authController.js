import { loginUseCase } from "../../useCases/auth/LoginUseCase";

async function loginWithMobile(req, res) {
    console.log(req.body)
    const { mobileNumber, fullName } = req.body;

    try {
        await loginUseCase.loginWithMobile(mobileNumber, fullName);
        res.status(200).json({ message: 'OTP sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

async function verifyOTP(req, res) {
    console.log(req.body)
    const { mobileNumber, OTP } = req.body;

    try {
        await loginUseCase.verifyOtp(mobileNumber, OTP, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}


export const authController = {
    loginWithMobile,
    verifyOTP
}