const express = require('express')
const router = express.Router()
const categoryController = require("../controllers/categoryController")
const productController = require("../controllers/productController")
const authMiddleware = require("../middleware/authMiddleware")

// get homepage
router.get('/', categoryController.category_home)

// get categories
router.get('/:category', categoryController.category_spec)

// get category by parent
router.get('/:parent/:category', categoryController.category_spec)

// get category products
router.get('/:parent/:category/:child', productController.product_home)

// get product page
router.get('/:parent/:category/:child/:product_id', productController.product_spec)

module.exports = router