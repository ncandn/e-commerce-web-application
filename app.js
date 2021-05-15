/* Express Initialization */
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

/* Router Initialization */
const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')

/* Application Setups */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

/* Routes Setups */
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.listen(process.env.PORT || 3000)