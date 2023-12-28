const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv').config()
// const jwt = require("jsonwebtoken");
const jwt = require('jwt-then')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { emailRegex } = require('../utils')

exports.register = async (req, res) => {
    const { fullName, email, password, mobile_number, } = req.body

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email is not valid !" })
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "password must contail atleast 6 characters long" })
    }
    const userExists = await User.findOne({ email, })
    if (userExists) {
        return res.status(400).json({ error: "user with same email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const user = new User({
        fullName,
        email,
        mobile_number,
        password: await bcrypt.hash(password, salt)
    })

    await user.save()
        .then(response => {
            res.status(201).json({
                message: `User ${fullName} register successfully!`,
                user: {
                    id: response._id,
                    fullName: response.fullName,
                    email: response.email,
                    picture: response.picture,
                    isPictureSet: response.isPictureSet,
                    mobile_number: response.mobile_number
                }

            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "Internal Server Error"
            })
        })



}


exports.googleAuth = async (req, res) => {

    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    console.log(ticket.getPayload())
    const { fullName, email, picture } = ticket.getPayload();
    const user = new User({
        fullName,
        email,
        picture
    })
    const findEmail = await User.findOne({ email })
    console.log(findEmail)
    const token_code = await jwt.sign({ id: email }, process.env.SECRET)
    if (!findEmail) {
        await user.save()
            .then(response => {
                res.status(200).json({
                    user: {
                        fullName,
                        email,
                    },
                    message: "User logedIn successfully !",
                    token: token_code
                })
            })
            .catch(errr => {
                console.log(errr)
                res.status(500).json({
                    errorMessage: "Internal Server Error"
                })
            })
    }
    else {
        res.status(200).json({
            user: {
                fullName,
                email,
            },
            message: "User logedIn successfully !",
            token: token_code
        })

    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email is not valid !" })
    }
    if (!password) {
        return res.status(400).json({ error: "Password should not be empty" })
    }
    if (password && password.length < 6) {
        return res.status(400).json({ error: "password must contail atleast 6 characters long" })
    }
    const findEmail = await User.findOne({ email })
    if (!findEmail) {
        return res.status(400).json({ error: 'email did not match' })
    }
    const findPassword = await bcrypt.compare(password, findEmail.password);

    if (!findPassword) {
        return res.status(400).json({ error: 'password did not match' })
    }

    const token = await jwt.sign({ id: findEmail._id }, process.env.SECRET)

    res.json({
        user: {
            id: findEmail._id,
            fullName: findEmail.fullName,
            email: findEmail.email,
            picture: findEmail.picture,
            isPictureSet: findEmail.isPictureSet,
            mobile_number: findEmail.mobile_number

        },
        message: "User logedIn successfully !", token,
    })


}

exports.getAllUser = async (req, res) => {
    const user = await User.find().sort({ created_at: -1 }).select({ "fullName": 1, "email": 1, "picture": 1, "is_active": 1, "_id": 1 })
    res.json(user)
}

module.exports.setProfile = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const picture = req.body.image;
        const userData = await User.findOneAndUpdate(
            _id,
            {
                isPictureSet: true,
                picture,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isPictureSet,
            image: userData.picture,
        });
    } catch (ex) {
        next(ex);
    }
};