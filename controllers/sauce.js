const express = require("express");
const jwt = require("jsonwebtoken");
const { Sauce } = require("../models/schema");

// file system, permet l'accès aux fonctions de modification le système de fichier
const fs = require("fs");

// retourne toutes les sauces de la bdd
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(
                sauces.map((sauce) => sauceNormalizer(req, sauce))
            );
        })

        .catch((error) => res.status(404).json(error));
};

// retourne une sauce par rapport à une id
exports.getASauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauceNormalizer(req, sauce));
        })
        .catch((error) => res.status(404).json(error));
};

// retourne un objet normal ald d'un objet mongoose
const sauceNormalizer = (req, sauce) => {
    return {
        ...sauce.toObject(),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            sauce.imageUrl
        }`,
    };
};

// capture une nouvelle sauce
exports.recordSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée ! " }))
        .catch((error) => res.status(400).json(error));
};

exports.modifySauce = (req, res) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "objet modifié" }))
        .catch((error) => res.status(400).json(error));
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const filename = sauce.imageUrl;
        console.log("filename", filename);
        fs.unlink(`public/images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json(sauce))
                .catch(error => res.status(404).json(error));
        });
    })
    .catch( error => res.status(500).json( error ));
};
