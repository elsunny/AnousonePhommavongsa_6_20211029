const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// utilisation du fichier env
require('dotenv').config()



//connexion à mongodb
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connexion à MongoDB réussie !'))
.catch(() => console.log('connexion à MongoDb échoué'));


//indique que le serveur va recevoir des données au format json
app.use(express.json());



// traitement des erreurs de cors
// accéder à notre API depuis n'importe quelle origine ( '*' )
// ajouter les headers mentionnés aux requêtes envoyées vers notre API
// envoyer des requêtes avec les méthodes mentionnées
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//indique où se trouve les routes
const authRouter = require('./routes/auth');
const saucesRouter = require('./routes/sauces');

//monte les chemins dans authRouter et saucesRouter
app.use('/api/auth/', authRouter)
app.use('/api/sauces/', saucesRouter)

app.use(express.static('public'));

module.exports = app;
