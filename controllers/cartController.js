const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`


const getCart = async(req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        res.render('products/cart', {cart : cartAPI.data})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const addCart = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const cartAPI = await axios.post(`${url}cart/addItem`, {
            "secretKey" : secret_key,
            "productId" : req.body.productId,
            "variantId" : req.body.variantId,
            "quantity" : req.body.quantity
        }, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        res.render('products/cart', {cart : cartAPI.data})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

module.exports = {getCart, addCart}