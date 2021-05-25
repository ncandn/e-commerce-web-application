const express = require('express')
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")
const { tokenAuth } = require("../middleware/authMiddleware")

router.get('/', tokenAuth, wishlistController.getWishlist)

router.post('/addItem', tokenAuth, wishlistController.addWishlist)

router.post('/changeItemQuantity', tokenAuth, wishlistController.changeQuantity)

router.delete('/removeItem', tokenAuth, wishlistController.removeWishlist)

module.exports = router