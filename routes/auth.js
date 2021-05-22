const express = require('express')
const router = express.Router()
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")


router.get('/signin', authController.getSignin)

router.get('/signup', authController.getSignup)

router.get('/signout', authController.getSignout)

router.post('/signin', authController.authSignin)

router.post('/signup', authController.authSignup)

module.exports = router