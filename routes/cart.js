const express = require('express')
const router = express.Router()
const cartController = require("../controllers/cartController")
const { tokenAuth } = require("../middleware/authMiddleware") // Authorization required to do cart operations

// Get cart page
router.get('/', tokenAuth, cartController.getCart)

// Add item to the cart
router.post('/addItem', tokenAuth, cartController.addCart)

// Change quantity of an item in the cart
router.post('/changeItemQuantity', tokenAuth, cartController.changeQuantity)

// Remove an item from the cart
router.delete('/removeItem', tokenAuth, cartController.removeCart)

module.exports = router