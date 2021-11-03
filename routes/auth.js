const express = require('express')
const router = express.Router()


router.post('/signup', (req, res) => {
    res.send('page signup')
})

router.post('/login', (req, res) => {
    // res.json(req.body)
    // res.send('hello world')
    res.json({userId:1, token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"})
    
})

module.exports = router