const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//creation d'un schema pour user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

// impose l'utilisation d'un user unique
userSchema.plugin(uniqueValidator);

//creation d'un schema pour sauce
const sauceSchema = mongoose.Schema ({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, default: []},
    usersDisliked: { type: Array, default: []}
});

// // creation d'un schema pour liker 
// const sauceLike = mongoose.Schema ({
//     userId: { type: String, required: true },
//     like: { type: Number, default: 0}
// });



//creation des modeles
const User = mongoose.model('User', userSchema);
const Sauce = mongoose.model('Sauce', sauceSchema);
// const Like = mongoose.model('Like', sauceLike);

//export pour une utilisation des modèles dans d'autres fichiers
module.exports = { Sauce, User };
