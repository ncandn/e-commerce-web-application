const express = require('express')
const router = express.Router()
const cartController = require("../controllers/cartController")
const { tokenAuth } = require("../middleware/authMiddleware")

router.get('/', tokenAuth, cartController.getCart)

router.post('/addItem', tokenAuth, cartController.addCart)

router.post('/changeItemQuantity', tokenAuth, cartController.changeQuantity)

router.delete('/removeItem', tokenAuth, cartController.removeCart)

module.exports = router