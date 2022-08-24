const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required!'
    },
    email: {
        type: String,
        required: 'Email is required!'
    },
    mobile_number: {
        type: Number,
    },
    password: {
        type: String
    },
    picture: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
    is_active: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('User', UserSchema)