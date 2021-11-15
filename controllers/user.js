const express = require("express");
const jwt = require("jsonwebtoken");

//import models schema
const { User } = require("../models/schema");

//import crypto to hash string
const crypto = require("crypto");
const salt = "banana";

// //signup route
// exports.signup = (req, res) => {
//     if (!req.body) {
//         return res.sendStatus(500);
//     }
//     // CREATE NEW USER
//     // search if email is already in DB
//     User.find({ email: req.body.email }, (err, data) => {
//         if (err) {
//             console.log("Oups une erreur s'est produite", err);
//         } else if (data.length > 0) {
//             res.status(400).json({ message: "Désolé cet email est déjà pris" });
//         } else {
//             // create user
//             delete req.body._id;
//             const pwd = getHash(req.body.password); // hash the user password
//             const user = new User({
//                 // ...req.body
//                 email: req.body.email,
//                 password: pwd,
//             });
//             // save new user in DB;
//             user.save()
//                 .then(() =>
//                     res.status(201).json({ message: "compte créé, bienvenue" })
//                 )
//                 .catch((error) => res.status(400).json({ error }));

//             res.status(201).json({ message: "Parfait, vous êtes enregistré" });
//         }
//     });
// };

//signup route
exports.signup = (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    }
    // CREATE NEW USER
    // create user
    delete req.body._id;
    const pwdSignup = getHash(req.body.password); // hash the user password
    const userSignup = new User({
        // ...req.body
        email: req.body.email,
        password: pwdSignup,
    });
    // save new user in DB;
    userSignup.save()
        .then(() => res.status(201).json({ message: "compte créé, bienvenue" }))
        .catch((error) => res.status(400).json({ error }));
};

// fonction qui hache le password de l'utilisateur
const getHash = (key) => {
    return crypto.createHmac("sha1", key).update(salt).digest("hex");
};

//login route
exports.login = (req, res) => {
    console.log('req', req.body);
    if (!req.body) {
        return res.status(500).json({ error: 'problème de connexion !'});
    }
    User.findOne({ email: req.body.email })
        .then( user => {
            if (!user) {
                return res.status(401).json({ error: 'utilisateur non trouvé !'});
            }
            const pwdLogin = getHash(req.body.password);
            if (pwdLogin != user.password) {
                return res.status(401).json({ error: 'mot de passe incorrect !'});
            } else {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId : user._id },
                        'random_token_secret',
                        { expiresIn: '24h' }
                    )
                })
            }
        })
        .catch( error => res.status(500).json( error ))
};
