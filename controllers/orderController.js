const axios = require('axios')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`

const orderPage = async (req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try {
        const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        res.locals.nav = ["order"]
        res.render('orders/index', {cart : cartAPI.data.items})
    } catch {
        res.redirect('/')
    }
}

module.exports = {orderPage}