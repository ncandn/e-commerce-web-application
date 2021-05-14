const express = require('express')
const router = express.Router()
const categoryController = require("../controllers/categoryController")

// get homepage
router.get('/', categoryController.category_home)

// get menswear
router.get('/:category', categoryController.category_spec)

module.exports = router