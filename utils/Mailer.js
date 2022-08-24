const nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require("path")

// declare vars
const songPublishMail = (toMail, receiverName, songName, songId) => {

    toMail = toMail || 'akash.masih@vlinkinfo.com';
    let subject = 'Song Lyrics published on karunaLyrics.com';

    // auth
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'groceryonline241@gmail.com',
            pass: 'Test@123'
        }
    });

    let emailTemplate;
    let capitalizedFirstName = receiverName;
    ejs
        .renderFile(path.join(__dirname, "../emailTemplates/publish.ejs"), {
            name: capitalizedFirstName,
            link: "localhost:3000/song/" + songId,
            song_name: songName
        })
        .then(result => {
            emailTemplate = result;

            // email options
            let mailOptions = {
                from: 'groceryonline241@gmail.com',
                to: toMail,
                subject: subject,
                html: emailTemplate
            };

            // send email
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    return { error }
                }
                return { success: response }
            });
        })
}

const suggesionsToAdmin = (feedbackId, feedback, fromName, fromEmail,) => {
    let toMail = "akashmasih1522@gmail.com";
    let subject = 'Suggestion karunaLyrics';

    // auth
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'groceryonline241@gmail.com',
            pass: 'Test@123'
        }
    });

    let emailTemplate;
    ejs
        .renderFile(path.join(__dirname, "../emailTemplates/suggestions.ejs"), {
            name: fromName,
            link: "http://localhost:3000/admin/feedback?id=" + feedbackId,
            feedback: feedback,
            feedback_id: feedbackId
        })
        .then(result => {
            emailTemplate = result;

            // email options
            let mailOptions = {
                from: 'groceryonline241@gmail.com',
                to: toMail,
                subject: subject,
                html: emailTemplate
            };

            // send email
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    return { error }
                }
                return { success: response }
            });
        })
}

const replyToPublisher = async (reply, toName, toMail) => {
    let subject = 'Thanks for your feedback';
    let respo = {}

    // auth
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'groceryonline241@gmail.com',
            pass: 'Test@123'
        }
    });

    let emailTemplate;
    ejs.renderFile(path.join(__dirname, "../emailTemplates/reply.ejs"), {
        name: toName,
        feedback: reply,
    })
        .then(result => {
            emailTemplate = result;

            // email options
            let mailOptions = {
                from: 'groceryonline241@gmail.com',
                to: toMail,
                subject: subject,
                html: emailTemplate
            };

            // send email
            transporter.sendMail(mailOptions, async (error, response) => {
                console.log(response)
                if (response)
                    await respo.success
                else
                    await respo.error

            });
        })
    return respo
}

module.exports = { songPublishMail, suggesionsToAdmin, replyToPublisher }
