const router = require('express').Router()
const ChatroomController= require('../controllers/ChatroomController')

const auth = require('../middlewares/auth')

router.post("/create",auth,ChatroomController.createChatroom)
router.get("/getAll", auth, ChatroomController.getAllChatroom )

module.exports= router