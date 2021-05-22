const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`


const getSignin = async (req,res)=>{
    try {
        res.render('auth/signin')
        //res.send(req.headers['authorization'])
    } catch {
        res.redirect('/')
    }
}

const getSignout = async (req,res)=>{
    try {
        res.cookie('token', '', {maxAge : 1})
        res.redirect('/')
        //res.send(req.headers['authorization'])
    } catch {
        res.redirect('/')
    }
}

const getSignup = async (req,res)=>{
    try {
        res.render('auth/signup')
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
        "name" : authAPI.data.name,
        "createdAt" : authAPI.data.createdAt
    }

    const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn : '10m'})

    res.cookie('token', token, {
        secure: false, // set to true if your using https
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