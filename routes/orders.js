const { render } = require('ejs')
const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const orderController = require("../controllers/orderController")
const { tokenAuth } = require("../middleware/authMiddleware")

router.get('/', tokenAuth, orderController.orderPage)

router.get('/history', tokenAuth, orderController.orderHistory)

router.post('/', [
    check('address', 'Address is required to make an order.')
        .exists()
], tokenAuth, orderController.orderPost)

router.get('/success', tokenAuth, orderController.orderSuccess)

router.get('/failure', tokenAuth, (req,res)=>{
    res.render('orders/failure')
})

module.exports = router