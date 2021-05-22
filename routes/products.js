const router = require('express-promise-router')()
const productController = require("../controllers/productController")

/* Get ALL Products */
router.get('/', productController.product_home)

/* Get A Product */
router.get('/product_search', productController.product_browse)


module.exports = router