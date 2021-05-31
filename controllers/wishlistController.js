const axios = require('axios')
const secret_key = process.env.SECRET_KEY
const url = process.env.URL

/* Everything is almost the same with cart */
const getWishlist = async(req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const wlItems = []
        const wlAPI = await axios.get(`${url}wishlist`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            },
            params: {
                "secretKey" : `${secret_key}`
            }
        })

        for(const item of wlAPI.data.items){
            const itemAPI = await axios.get(`${url}products/product_search?id=${item.productId}&secretKey=${secret_key}`)
            wlItems.push({info: itemAPI.data[0], actual: item})
        }

        res.locals.nav = ["wishlist"]
        res.render('products/wishlist', {wishlist : wlItems})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const addWishlist = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const wlAPI = await axios.post(`${url}wishlist/addItem`, {
            "secretKey" : secret_key,
            "productId" : req.body.productId,
            "variantId" : req.body.variantId,
            "quantity" : req.body.quantity
        }, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        res.redirect('/wishlist')
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

const changeQuantity = async(req, res)=>{
    const tokenAPI = req.cookies.axios_token
    try{
        const wlAPI = await axios.post(`${url}wishlist/changeItemQuantity`, {
            "secretKey" : secret_key,
            "productId" : req.body.productId,
            "variantId" : req.body.variantId,
            "quantity" : req.body.quantity
        }, {
            headers : {
                'Authorization' : `Bearer ${tokenAPI}`
            }
        })
        res.redirect('/wishlist')
    }catch(err){
        res.render('error', err.resposnse.data.error)
    }
}

const removeWishlist = async(req, res) =>{
    const tokenAPI = req.cookies.axios_token

    try{
        const cartAPI = await axios.delete(`${url}wishlist/removeItem` ,{
            headers: {
                'Authorization' : `Bearer ${tokenAPI}`
            },
            data: {
                "secretKey" : secret_key,
                "productId" : req.body.productId,
                "variantId" : req.body.variantId
            }
        })
        res.redirect('/wishlist')

    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

module.exports = {getWishlist, addWishlist, changeQuantity, removeWishlist}