const express = require('express')
const router = express.Router()


router.post('/signup', (req, res) => {
    res.send('page signup')
})

router.post('/login', (req, res) => {
    res.send('page login')
})

module.exports = router