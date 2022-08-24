const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    message: {
        type: String
    },
    publisher_email: {
        type: String
    },
    publisher_name: {
        type: String
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: "raise"
    },
    reply: {
        type: String
    },
    resolveDate: {
        type: Date
    }

})

module.exports = mongoose.model('Feedback', feedbackSchema)

//status raise , resolve
