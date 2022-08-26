const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: 'fullName is required!'
    },
    email: {
        type: String,
        required: 'Email is required!'
    },
    mobile_number: {
        type: String,
        default: ''
    },
    password: {
        type: String
    },
    isPictureSet: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: ''
    },
    registeredOn: {
        type: Date,
        default: new Date()
    },
    is_active: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('User', UserSchema)