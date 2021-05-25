const jwt = require('jsonwebtoken')

const tokenAuth = async (req,res,next) =>{
    const token = req.cookies.token
    
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,decode)=>{
            if(err){
                //console.log(err.message)
                res.redirect('/auth/signin')
            } else{
                //console.log(decode)
                next()
            }
        })
    }else{
        res.redirect('/auth/signin')
    }
}

const checkUser = async (req,res,next)=>{
    const token = req.cookies.token

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,decode)=>{
            if(err){
                //console.log(err.message)
                res.locals.user = null
                next()
            }else{
                //console.log(decode)
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