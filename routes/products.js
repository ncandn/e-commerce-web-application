const express = require('express')
const router = express.Router()
const productController = require("../controllers/productController")

/* Get ALL Products */
router.get('/', productController.product_home)

/* Get A Product */
router.get('/product_search', productController.product_spec)

module.exports = router