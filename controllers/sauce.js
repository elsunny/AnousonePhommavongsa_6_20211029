const express = require("express");
const jwt = require("jsonwebtoken");

const { Sauce } = require("../models/schema");

// retourne toutes les sauces de la bdd
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then((sauce) => res.status(200).json({ sauce }))
        .catch((error) => res.status(404).json({ error }));
};

// retourne une sauce par rapport à une id
exports.getASauce = (req, res) => {
    const sauce = Sauce.find({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

// capture une nouvelle sauce
exports.recordSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log('sauceObject', sauceObject);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        dislikes: 0
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée ! " }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "objet modifié" }))
        .catch((error) => res.status(400).json({ error }));
};

// exports.deleteSauce
