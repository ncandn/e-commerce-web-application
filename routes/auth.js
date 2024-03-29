const express = require('express')
const { check } = require('express-validator') // Input testing
const router = express.Router()
const authController = require("../controllers/authController")

router.get('/signin', authController.getSignin)

router.get('/signup', authController.getSignup)

router.get('/signout', authController.getSignout)

router.post('/signin', authController.authSignin)

// Name(3 chars), email(valid), password(5 chars) and conf(must match with password) must exists.
router.post('/signup', [
    check('name', 'Name required, minimum 3 characters.')
        .exists()
        .isLength({min : 3}),
    check('email', 'A valid email is required.')
        .exists()
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password required, minimum 5 characters.')
        .exists()
        .isLength({min : 5}),
    check('passwordConf', 'Passwords must match.')
        .custom((value, {req})=>{
            if(value !== req.body.password){
                throw new Error('Passwords must match.')
            }
            return true
        })
], authController.authSignup)

module.exports = router