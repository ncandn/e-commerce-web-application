const express = require('express')
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")
const { tokenAuth } = require("../middleware/authMiddleware")

router.get('/', tokenAuth, wishlistController.getWishlist)

module.exports = router