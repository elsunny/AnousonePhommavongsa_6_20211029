const express = require("express");
const jwt = require("jsonwebtoken");

require('dotenv').config()

//import models schema
const { User } = require("../models/schema");

//import crypto to hash string
const crypto = require("crypto");
const salt = process.env.DB_SALT;


//signup route
exports.signup = (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    }
    // CREATE NEW USER
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
                        process.env.DB_TOKEN,
                        { expiresIn: '24h' }
                    )
                })
            }
        })
        .catch( error => res.status(500).json( error ))
};

// //login route with async await version
// exports.login = async (req, res) => {
//     if (!req.body) {
//         return res.status(500).json({ error: 'problème de connexion !'});
//     }
//     try {
//         const user = await User.findOne({ email: req.body.email }).exec();
//         if (!user) {
//             return res.status(401).json({ error: 'utilisateur non trouvé !'});
//         }
//         const pwdLogin = getHash(req.body.password);
//         if (pwdLogin != user.password) {
//             return res.status(401).json({ error: 'mot de passe incorrect !'});
//         } else {
//             res.status(200).json({
//                 userId: user._id,
//                 token: jwt.sign(
//                     { userId : user._id },
//                     'random_token_secret',
//                     { expiresIn: '24h' }
//                 )
//             })
//         }
    
//     } catch( error) {
//         res.status(500).json( error )
//     }
// };