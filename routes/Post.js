const router = require('express').Router()
const userController= require('../controllers/PostController')
const auth = require('../middlewares/auth')

router.post("/",auth,userController.create)
router.get("/",auth,userController.getAll)
router.get("/:id",auth,userController.getByID)
router.put("/:id",auth,userController.update)
router.delete("/:id",auth,userController.delete)

module.exports= router