const jwt = require('jsonwebtoken')

// Are you authorized to access this ? Proceed : Signin
const tokenAuth = async (req,res,next) =>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,decode)=>{
            if(err){
                res.redirect('/auth/signin')
            } else{
                next()
            }
        })
    }else{
        res.redirect('/auth/signin')
    }
}

// Create a local user if logged in / signed up
const checkUser = async (req,res,next)=>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,decode)=>{
            if(err){
                res.locals.user = null
                next()
            }else{
                res.locals.user = decode
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = {checkUser, tokenAuth}