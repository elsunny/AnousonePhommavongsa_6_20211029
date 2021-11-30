const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//import models schema
const { User } = require("../models/schema");

const validator = require("email-validator");
const isValidPassword = require("is-valid-password");

// import bcrypt
const bcrypt = require("bcrypt");

// check email and password
const checkEntries = (mail, pwd) => {
    return Boolean(validator.validate(mail) && isValidPassword(pwd));
};

//signup route
exports.signup = (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    }
    if (checkEntries(req.body.email, req.body.password)) {
        // CREATE NEW USER
        delete req.body._id;
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const userSignup = new User({
                    email: req.body.email,
                    password: hash,
                });
                userSignup
                    .save()
                    .then(() =>
                        res
                            .status(201)
                            .json({ message: "compte créé, bienvenue" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
    } else {
        res.status(400).json({
            message:
                "Vérifier votre email svp, votre mot de passe doit comprende entre 8 et 32 lettres avec au moins 1 minuscule, 1 majuscule et 1 chiffre",
        });
    }
};

//login route
exports.login = (req, res) => {
    if (!req.body) {
        return res.status(500).json({ error: "problème de connexion !" });
    }
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => res.status(500).json(error));
        })
        .catch((error) => res.status(500).json(error));
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
