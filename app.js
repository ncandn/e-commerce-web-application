/* Express Initialization */
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const { checkUser } = require('./middleware/authMiddleware')
require('dotenv').config()

/* Router Initialization */
const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/orders')
const wishlistRouter = require('./routes/wishlist')

/* Application Setups */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static('public'))

/* Routes Setups */
app.use('*', checkUser)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.urlencoded({extended : false}))
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/auth', authRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/wishlist', wishlistRouter)
app.listen(process.env.PORT || 3000)