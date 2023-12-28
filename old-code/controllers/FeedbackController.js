const Feedback = require('../models/Feedback')
const { suggesionsToAdmin, replyToPublisher } = require('../utils/Mailer')


exports.createFeedback = async (req, res) => {
    const { message, publisher_email, publisher_name } = req.body
    if (message === "" || message === undefined || message === null) {
        return res.status(400).json({ error: "Message is not valid or empty !" })
    }
    if (publisher_email === "" || publisher_email === undefined || publisher_email === null) {
        return res.status(400).json({ error: "Email is not valid or empty !" })
    }
    if (publisher_name === "" || publisher_name === undefined || publisher_name === null) {
        return res.status(400).json({ error: "Name is not valid or empty !" })
    }
    const feedback = new Feedback({
        message,
        publisher_email,
        publisher_name
    })

    await feedback.save()
        .then(response => {
            suggesionsToAdmin(response._id, message, publisher_name)  //send email
            return res.status(200).json({ message: "Your Feedback submitted successfully. Thank you for your precious feedback" })
        })
        .catch(err => {
            return res.status(500).json({ error: "Internal server error" })
        })

}

//respond to the feedback
exports.respondToFeedback = async (req, res) => {
    const { message, publisher_email, publisher_name, feedback_id } = req.body

    if (message === "" || message === undefined || message === null) {
        return res.status(400).json({ error: "Message is not valid or empty !" })
    }
    if (publisher_email === "" || publisher_email === undefined || publisher_email === null) {
        return res.status(400).json({ error: "Email is not valid or empty !" })
    }
    if (publisher_name === "" || publisher_name === undefined || publisher_name === null) {
        return res.status(400).json({ error: "Name is not valid or empty !" })
    }
    if (feedback_id === "" || feedback_id === undefined || feedback_id === null) {
        return res.status(400).json({ error: "Name is not valid or empty !" })
    }

    await Feedback.findByIdAndUpdate(feedback_id, { status: 'resolve', reply: message, resolveDate: new Date() }, { new: true }, async function (error, response) {
        if (error) {
            return res.status(500).json({ error: "Feedback Id is not correct" })
        }
        else {
            if (response._id) {
                //send email
                await replyToPublisher(message, publisher_name, publisher_email)

                return res.status(200).json({ message: "Email sent Successfully" })

            }

        }
    })

}


//// get list of all the feedback // raise feedback and resolve feedback

exports.getAllFeedback = async (req, res) => {
    const { type } = req.query
    if (type === "all") {
        Feedback.find({}, (error, response) => {
            if (error) {
                return res.status(400).json({ error })
            }
            else {
                return res.status(200).json({ data: response })
            }
        })
    }
    else if (type === "raise" || type === "resolve") {
        Feedback.find({ status: type }, (error, response) => {
            if (error) {
                return res.status(400).json({ error })
            }
            else {
                return res.status(200).json({ data: response })
            }
        })

    }

    if (type !== "all" && type !== "raise" && type !== "resolve") {
        return res.status(400).json({ message: "request param should be 'all', 'raise', 'resolve' " })
    }

}

