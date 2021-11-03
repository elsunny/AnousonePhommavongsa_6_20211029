const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('ok', res.send(`listen on port ${port}`))
})

//indique que le serveur va recevoir du json
app.use(express.json())

const authRouter = require('./routes/auth')
const saucesRouter = require('./routes/sauces')

//racine de base est /api
// app.set('base', '/api')

app.use('/api/auth', authRouter)
app.use('/api/sauces', saucesRouter)

app.listen(port)