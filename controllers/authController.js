const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`


const getSignin = async (req,res)=>{
    try {
        res.render('auth/signin')
        res.locals.nav = ["auth", "signin"]
    } catch {
        res.redirect('/')
    }
}

const getSignout = async (req,res)=>{
    try {
        res.cookie('token', '', {maxAge : 1})
        res.cookie('axios_token', '', {maxAge : 1})
        res.redirect('/')
    } catch {
        res.redirect('/')
    }
}

const getSignup = async (req,res)=>{
    try {
        res.render('auth/signup')
        res.locals.nav = ["auth", "signup"]
    } catch {
        res.redirect('/')
    }
}

const authSignin = async (req,res)=>{
   
    const user_log = {
        "secretKey" : secret_key,
        "email" : req.body.email,
        "password" : req.body.password
    }

    const authAPI = await axios.post(`${url}auth/signin`, user_log)

    const user = {
        "secretKey" : secret_key,
        "email" : req.body.email,
        "password" : req.body.password,
        "name" : authAPI.data.user.name,
        "createdAt" : authAPI.data.user.createdAt
    }

    const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn : '25m'})

    res.cookie('axios_token', authAPI.data.token, {
        seucre : false,
        httpOnly: true
    })

    res.cookie('token', token, {
        secure: false, 
        httpOnly: true
    });
  
    console.log("Cookies: " + req.cookies.token)
    res.redirect('/')
}

const authSignup = async (req,res)=>{
    const authAPI = await axios.post(`${url}auth/signup`, {
        "secretKey" : secret_key,
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : req.body.password
    })
    res.send(authAPI.data)
}

module.exports = {authSignin, authSignup, getSignin, getSignup, getSignout}