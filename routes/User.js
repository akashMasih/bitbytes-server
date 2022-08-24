const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post("/login", userController.login)
router.post("/googleAuth", userController.googleAuth)
router.post("/register", userController.register)
router.get("/getAll", userController.getAllUser)

module.exports = router