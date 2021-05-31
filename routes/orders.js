const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const orderController = require("../controllers/orderController")
const { tokenAuth } = require("../middleware/authMiddleware") // Auth required for orders to operate

// Get order page
router.get('/', tokenAuth, orderController.orderPage)

// Transaction history
router.get('/history', tokenAuth, orderController.orderHistory)

// Issue an order (address must exist)
router.post('/', [
    check('address', 'Address is required to make an order.')
        .exists()
], tokenAuth, orderController.orderPost)

// Successful order
router.get('/success', tokenAuth, orderController.orderSuccess)

// Fail order
router.get('/failure', tokenAuth, (req,res)=>{
    res.render('orders/failure')
})

module.exports = router