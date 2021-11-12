const express = require("express");

//import models schema
const { User } = require("../models/schema");

//import crypto to hash string
const crypto = require("crypto");
const salt = "banana";





//signup route
exports.signup = (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        delete req.body._id;
        const pwd = getHash(req.body.password);
        const user = new User({
            // ...req.body
            email: req.body.email,
            password: pwd,
        })
        console.log('user', user);
        //save in DB
        user.save()
            .then(() =>
                res.status(201).json({ message: "compte créé, bienvenue" })
            )
            .catch((error) => res.status(400).json({ error }));
    }
};

// fonction qui hache le password de l'utilisateur
const getHash = (key) => {
    return crypto.createHmac("sha1", key).update(salt).digest("hex");
};

//login route
exports.login = (req, res) => {
    console.log('je suis dans login');
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        // delete req.body._id;
        const pwd = getHash(req.body.password);
        const user = new User({
            // ...req.body
            email: req.body.email,
            password: pwd,
        });
    }
};


