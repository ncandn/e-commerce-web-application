const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`


const getCart = async(req,res)=>{
    jwt.verify(req.token, secret_key, async (err,data)=>{
        if(err){
            res.sendStatus(403)
        } else {
            const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`)

            res.json({message : cartAPI.data,
                data
            })
        }
    })

    
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['Authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
    }else{
        res.sendStatus(403)
    }
}

module.exports = {getCart, verifyToken}