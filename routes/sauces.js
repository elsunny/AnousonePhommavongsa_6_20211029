const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('tableau de toutes les sauces')
})

// ':' signifie que id sera un paramètre
router.get('/:id', (req, res) => {
    res.send('sauce avec l\'id fourni')
    console.log(req);
})

router.post('/', (req, res) => {
    res.send('capture image')
})

module.exports = router