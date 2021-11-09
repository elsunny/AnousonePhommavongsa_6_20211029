const mongoose = require('mongoose')



//creation d'un shema pour sauce
const sauceSchema = mongoose.Schema ({
    name: { type: String, required: true },
    manufacturer: { type: String, required: false },
    description: { type: String, required: true },
    mainPepper: { type: String, required: false },
    imageUrl: { type: String, required: true },
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: Array,
    usersDisliked: Array
})

//creation d'un shema pour user
const userSchema = mongoose.Schema({
    email: String,
    password: String
})

//creation d'un modele de sauce
const Sauce = mongoose.model('Sauce', sauceSchema)

//creation d'un modele de user
const User = mongoose.model('User', userSchema)

//export pour une utilisation des modèles dans d'autres fichiers
module.exports = { Sauce, User}