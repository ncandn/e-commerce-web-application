const axios = require('axios')
const secret_key = process.env.SECRET_KEY
const url = process.env.URL

// Get cart page
const getCart = async(req,res)=>{
    // Check auth
    const tokenAPI = req.cookies.axios_token
    try{
        const cartItems = [] // Create items array
        const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        
        /* res.data has both product information (info) and cart information (actual) */
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

// Add item to the cart
const addCart = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token // Check auth
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

// Change quantity
const changeQuantity = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token // Check auth
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

// Remove an item
const removeCart = async(req, res) =>{
    const tokenAPI = req.cookies.axios_token // Check auth

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