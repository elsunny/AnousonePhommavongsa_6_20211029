const express = require("express");
const router = express.Router();

//import models schema
const { Sauce, User } = require("../models/schema");

//import crypto to hash string
const crypto = require("crypto");
const salt = "banana";

router.post("/signup", (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        delete req.body._id;
        const pwd = getHash(req.body.password)
        const user = new User({
            // ...req.body
            email: req.body.email,
            password: pwd
        });
        user.save()
        .then(() => res.status(201).json({ message: 'compte créé, bienvenue'}))
        .catch(error => res.status(400).json({ error }))
    }
});

// fonction qui hache le password de l'utilisateur
const getHash = (key) => {
    return (crypto.createHmac("sha1", key).update(salt).digest("hex"));
};

router.post("/login", (req, res) => {
    // res.json(req.body)
    // res.send('hello world')
    res.json({
        userId: 1,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    });
});

module.exports = router;
