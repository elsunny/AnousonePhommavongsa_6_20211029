const express = require('express')
const app = express()

const port = 3000

const multer = require('multer')
const upload = multer()

const cors = require('cors')

const mongoose = require('mongoose')





//allow all domain name to connect to the server
app.use(cors())

app.get('/', (req, res) => {
    console.log('ok', res.send(`listen on port ${port}`))
})

//indique que le serveur va recevoir des données au format json
app.use(express.json())

//indique où se trouve les routes
const authRouter = require('./routes/auth')
const saucesRouter = require('./routes/sauces')

//active l'utilisation des routes
app.use('/api/auth', authRouter)
app.use('/api/sauces', saucesRouter)

app.listen(port)

//connexion à mongodb
const dbUri = 'mongodb+srv://anouph:t9R5NweDMJixREKx@ocp6.bjkl5.mongodb.net/OCP6?retryWrites=true&w=majority'
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connexion à MongoDB réussie !'))
.catch(() => console.log('connexion à MongoDb échoué'))

 
