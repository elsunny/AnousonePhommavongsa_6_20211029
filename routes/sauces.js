const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('tableau de toutes les sauces')
})

// ':' signifie que id sera un paramètre
router.get('/:id', (req, res) => {
    res.send('sauce avec l\'id fourni')
})

router.post('/', (req, res) => {
    res.send('capture image')
})

router.put('/:id', (req, res) => {
    res.send('sauces update')
})

router.delete('/:id', (req, res) => {
    res.send('supprime la sauce')
})

router.post('/:id/like', (req, res) => {
    res.send('sauce liker')
})

module.exports = router