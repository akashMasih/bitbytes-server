const mongoose = require('mongoose')

const UserTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: 'User Type is required!'
    },
    description: {
        type: String,
    },
    timestamps: {
        type: new Date,
    },
})

module.exports = mongoose.model('UserType', UserTypeSchema)