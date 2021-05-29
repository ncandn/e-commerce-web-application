const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.locals.nav = ["home"]
    res.render('index', {active_user : req.cookies.token})
})

module.exports = router