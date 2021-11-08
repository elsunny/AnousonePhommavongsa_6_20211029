const mongoose = require('mongoose')



//creation d'un shema pour la bdd
const sauceSchema = mongoose.Schema ({
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [],
    usersDisliked: []
})

const userSchema = mongoose.Schema({
    email: String,
    password: String
})