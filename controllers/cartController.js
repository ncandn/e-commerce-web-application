const axios = require('axios')
const secret_key = process.env.SECRET_KEY
const url = process.env.URL


const getCart = async(req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const cartItems = []
        const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })

        for(const item of cartAPI.data.items){
            const itemAPI = await axios.get(`${url}products/product_search?id=${item.productId}&secretKey=${secret_key}`)
            cartItems.push({info: itemAPI.data[0], actual: item})
        }

        res.locals.nav = ["cart"]
        res.render('products/cart', {cart : cartItems})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const addCart = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        await axios.post(`${url}cart/addItem`, {
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
        await axios.post(`${url}cart/changeItemQuantity`, {
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

const removeCart = async(req, res) =>{
    const tokenAPI = req.cookies.axios_token

    try{
        await axios.delete(`${url}cart/removeItem` ,{
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

module.exports = {getCart, addCart, changeQuantity, removeCart}