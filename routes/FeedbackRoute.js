const router = require('express').Router()
const FeedbackController = require('../controllers/FeedbackController')


router.post("/", FeedbackController.createFeedback)
router.get("/", FeedbackController.getAllFeedback)
router.put("/", FeedbackController.respondToFeedback)


module.exports = router