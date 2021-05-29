const express = require('express')
const router = express.Router()
const orderController = require("../controllers/orderController")
const { tokenAuth } = require("../middleware/authMiddleware")

router.get('/', tokenAuth, orderController.orderPage)

router.post('/', tokenAuth, orderController.orderPost)

router.get('/success', tokenAuth, orderController.orderSuccess)

module.exports = router