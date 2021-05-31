const express = require('express')
const router = express.Router()

// Get main page
router.get('/', async (req, res) => {
    res.locals.nav = ["home"]
    res.render('index', {active_user : req.cookies.token}) // Is there an active user?
})

module.exports = router