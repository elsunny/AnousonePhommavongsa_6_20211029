const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => {
    console.log('ok', res.send(`listen on port ${port}`))
})

// app.post('/signup', (req, res) => {
//     res.send('page signup')
// })

// app.get('/login', (req, res) => {
//     res.send('page signup')
// })

const authRouter = require('./routes/auth')
const saucesRouter = require('./routes/sauces')

app.use('/auth', authRouter)
app.use('/sauces', saucesRouter)

app.listen(port)