const axios = require('axios')
const { validationResult } = require('express-validator')
const secret_key = process.env.SECRET_KEY
const url = process.env.URL
const paypal = require('paypal-rest-sdk');
var total_sum = 0
var default_address = 'no address given'

paypal.configure({
    'mode': 'sandbox', 
    'client_id': process.env.PAYPAL_CLI_ID,
    'client_secret': process.env.PAYPAL_CLI_SK
})

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
    } catch(err) {
        res.render('error', {error : err.response.data.error})
    }
}

const orderHistory = async(req,res)=>{
    const tokenAPI = req.cookies.axios_token
    try {
        const orderAPI = await axios.get(`${url}orders?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })
        res.locals.nav = ["order", "history"]
        console.log(orderAPI.data)
        res.render('orders/history', {history : orderAPI.data})
    } catch(err) {
        res.render('error', {error : err.response.data.error})
    }
}

const orderPost = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('orders/index', {alert})
    }else{
        const tokenAPI = req.cookies.axios_token
        try{
            const cartItems = []
            const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
                headers: {
                    'Authorization': `Bearer ${tokenAPI}`
                }
            })

            for(const item of cartAPI.data.items){
                cartItems.push({
                    "name": item.productId,
                    "sku": item.variant.product_id,
                    "price": item.variant.price,
                    "currency": "USD",
                    "quantity": item.quantity
                })
            }

            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `${process.env.HEROKU_DOM}/order/success`,
                    "cancel_url": `${process.env.HEROKU_DOM}/order/failure`
                },
                "transactions": [{
                    "item_list": {
                        "items": cartItems
                    },
                    "amount": {
                        "currency": "USD",
                        "total": parseFloat(req.body.sum).toFixed(2)
                    },
                    "description": "OSF Academy PayPal transaction."
                }]
            }

            total_sum = parseFloat(req.body.sum).toFixed(2)
            default_address = req.body.address
            console.log(cartItems)
            console.log(total_sum)
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error
                } else {
                    for(let i = 0; i < payment.links.length; i++){
                        if(payment.links[i].rel === 'approval_url'){
                            res.redirect(payment.links[i].href)
                        }
                    }
                }
            })
        }catch(err){
            res.render('error', {error: err})
        }
    }
}

const orderSuccess = async(req,res)=>{
    try{
        const tokenAPI = req.cookies.axios_token
        const payerID = req.query.PayerID
        const paymentID = req.query.paymentId

        const cartAPI = await axios.get(`${url}cart?secretKey=${secret_key}`, {
            headers: {
                'Authorization': `Bearer ${tokenAPI}`
            }
        })

        const exec_payment_json = {
            "payer_id": payerID,
            "transactions": [{
                "amount":{
                    "currency": "USD",
                    "total": total_sum
                }
            }]
        }
        
        paypal.payment.execute(paymentID, exec_payment_json, async function(error, payment){
            if(error){
                throw error
            }else{
                await axios.post(`${url}orders` ,{
                    "secretKey" : secret_key,
                    "address" : default_address,
                    "paymentId" : paymentID,
                    "items" : cartAPI.data.items
                }, {
                    headers : {
                        'Authorization' : `Bearer ${tokenAPI}`
                    }
                })
            }
        })

        res.render('orders/success')

    }catch(err){
        res.render('error', {error: err})
    }
}

module.exports = {orderPage, orderPost, orderSuccess, orderHistory}