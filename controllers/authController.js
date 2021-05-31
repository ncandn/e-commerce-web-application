const axios = require('axios')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const secret_key = process.env.SECRET_KEY
const url = process.env.URL

// Get signin page
const getSignin = async (req,res)=>{
    try {
        res.render('auth/signin')
        res.locals.nav = ["auth", "signin"]
    } catch {
        res.redirect('/')
    }
}

// Signout from the system
const getSignout = async (req,res)=>{
    try {
        res.cookie('token', '', {maxAge : 1})           /* Set cookies' lifespan to 1  */
        res.cookie('axios_token', '', {maxAge : 1})     /* Cookies will die immediately */
        res.redirect('/')
    } catch {
        res.redirect('/')
    }
}

// Get signup page
const getSignup = async (req,res)=>{
    try {
        res.render('auth/signup')
        res.locals.nav = ["auth", "signup"]
    } catch {
        res.redirect('/')
    }
}

// Signin to the system.
const authSignin = async (req,res)=>{
    try{
        /* Create a user log for API */
        const user_log = {
            "secretKey" : secret_key,
            "email" : req.body.email,
            "password" : req.body.password
        }

        const authAPI = await axios.post(`${url}auth/signin`, user_log)

        /* Create a user for JWT using API data */
        const user = {
            "secretKey" : secret_key,
            "email" : req.body.email,
            "password" : req.body.password,
            "name" : authAPI.data.user.name,
            "createdAt" : authAPI.data.user.createdAt
        }

        /* Create authorization token to login */
        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn : '25m'})

        /* Set cookies */
        res.cookie('axios_token', authAPI.data.token, {
            seucre : false,
            httpOnly: true
        })

        res.cookie('token', token, {
            secure: false, 
            httpOnly: true
        })
    
        res.redirect('/')
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

// Signup to the system
const authSignup = async (req,res)=>{
    /* Validate express-validator controls */
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('auth/signup', {alert})
    }else{
        try{
            /* Send a post request to API */
            const authAPI = await axios.post(`${url}auth/signup`, {
                "secretKey" : secret_key,
                "name" : req.body.name,
                "email" : req.body.email,
                "password" : req.body.password
            })

            /* Create user for JWT auth */
            const user = {
                "secretKey" : secret_key,
                "email" : req.body.email,
                "password" : req.body.password,
                "name" : req.body.name,
                "createdAt" : authAPI.data.user.createdAt
            }

            /* User logged in */
            const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn : '25m'})

            res.cookie('axios_token', authAPI.data.token, {
                seucre : false,
                httpOnly: true
            })
        
            res.cookie('token', token, {
                secure: false, 
                httpOnly: true
            })
            res.redirect('/')
        }catch(err){
            res.render('error', {error : err.response.data.error})
        }
    }
}

module.exports = {authSignin, authSignup, getSignin, getSignup, getSignout}