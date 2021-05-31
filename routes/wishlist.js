const express = require('express')
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")
const { tokenAuth } = require("../middleware/authMiddleware") // Auth required for wishlist to operate

// Get wishlist page
router.get('/', tokenAuth, wishlistController.getWishlist)

// Add item to the wishlist
router.post('/addItem', tokenAuth, wishlistController.addWishlist)

// Change quantity of an item in the wishlist
router.post('/changeItemQuantity', tokenAuth, wishlistController.changeQuantity)

// Remove an item from the wishlist
router.delete('/removeItem', tokenAuth, wishlistController.removeWishlist)

module.exports = router