const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


//creation d'un shema pour user
const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// // impose l'utilisation d'un user unique
// userSchema.plugin(uniqueValidator);

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
});



//creation des modeles
const User = mongoose.model('User', userSchema);
const Sauce = mongoose.model('Sauce', sauceSchema);

//export pour une utilisation des modèles dans d'autres fichiers
module.exports = { Sauce, User };
