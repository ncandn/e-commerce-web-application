const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {active_user : req.cookies.token})
})

module.exports = router