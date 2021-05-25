const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`

const getWishlist = async(req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const wlAPI = await axios.get(`${url}wishlist`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            },
            params: {
                "secretKey" : `${secret_key}`
            }
        })
        res.render('products/wishlist', {wishlist : wlAPI.data})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const addWishlist = async(req, res)=>{
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
        res.redirect('/cart')
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const changeQuantity = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const cartAPI = await axios.post(`${url}cart/changeItemQuantity`, {
            "secretKey" : secret_key,
            "productId" : req.body.productId,
            "variantId" : req.body.variantId,
            "quantity" : req.body.quantity
        }, {
            headers : {
                'Authorization' : `Bearer ${tokenAPI}`
            }
        })
        res.redirect('/cart')
    }catch(err){
        res.render('error', err.resposnse.data.error)
    }
}

const removeWishlist = async(req, res) =>{
    const tokenAPI = req.cookies.axios_token

    try{
        const cartAPI = await axios.delete(`${url}cart/removeItem` ,{
            headers: {
                'Authorization' : `Bearer ${tokenAPI}`
            },
            data: {
                "secretKey" : secret_key,
                "productId" : req.body.productId,
                "variantId" : req.body.variantId
            }
        })
        res.redirect('/cart')

    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

module.exports = {getWishlist, addWishlist, changeQuantity, removeWishlist}