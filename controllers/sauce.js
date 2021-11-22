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

// retourne une sauce par rapport à un id sauce
exports.getASauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauceNormalizer(req, sauce));
        })
        .catch((error) => res.status(404).json(error));
};

// permet de normaliser un objet mongoose
const sauceNormalizer = (req, sauce) => {
    return {
        ...sauce.toObject(),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            sauce.imageUrl
        }`,
    };
};

// enregistre une nouvelle sauce
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

//modifie une sauce
exports.modifySauce = (req, res) => {
    //supprime l'image précédente si une nouvelle image est uploadée
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        const filenameHistory = sauce.imageUrl;
        if (req.file) {
            fs.unlink(`public/images/${filenameHistory}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    // mise à jour des informations de la sauce
    const sauceModified = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.file.filename}`,
          }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceModified, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "objet modifié" }))
        .catch((error) => res.status(400).json(error));
};

// supprime une sauce
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl;
            fs.unlink(`public/images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json(sauce))
                    .catch((error) => res.status(404).json(error));
            });
        })
        .catch((error) => res.status(500).json(error));
};

// like dislike la sauce
exports.likeSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const foundInLiked = isInArray(sauce.usersLiked, req.body.userId);
            const foundInDisliked = isInArray(sauce.usersDisliked, req.body.userId);
            const like = req.body.like;
            // l'utilisateur n'a jamais liker ou disliker
            if ((!foundInLiked) && (!foundInDisliked)) {
                switch (like) {
                    case 1 : 
                        addLikeDislike(sauce, 'usersLiked', req.body.userId);
                        break;
                    case -1: 
                        addLikeDislike(sauce, 'usersDisliked', req.body.userId);
                        break;
                }

            }
            // l'utilisateur a déjà liké
            else if (foundInLiked) {
                switch (like) {
                    case 1:
                        res.status(400).json({message: 'Vous avez déjà liké'}); 
                        return;
                    case 0:
                        removeLikeDislike(sauce, 'usersLiked', req.body.userId);
                        break;
                    case -1: 
                        removeLikeDislike(sauce, 'usersLiked', req.body.userId);
                        addLikeDislike(sauce, 'usersDisliked', req.body.userId);
                        break;
                    
                }
            }
            // l'utilisateur a déjà disliké
            else if (foundInDisliked) {
                switch (like) {
                    case 1:
                        removeLikeDislike(sauce, 'usersDisliked', req.body.userId);
                        addLikeDislike(sauce, 'usersLiked', req.body.userId);
                        break;
                    case 0:
                        removeLikeDislike(sauce, 'usersDisliked', req.body.userId);
                        break;
                    case -1:
                        res.status(400).json({message: 'Vous avez déjà disliké'});
                        return;

                }
            }
            res.status(200).json(sauceNormalizer(req, sauce));
        })
        .catch((error) => res.status(404).json(error));
};

// comptabilise le nombre de likes ou dislikes
const computeLikeDislike = (sauce) => {
    sauce.likes = sauce.usersLiked.length;
    sauce.dislikes = sauce.usersDisliked.length;
}

// fonction qui ajoute un like ou dislike
const addLikeDislike = (sauce, prop, el) => {
    try {
        sauce[prop].push(el);
        computeLikeDislike(sauce);
        sauce.save();

    } catch (error) {
        console.log(error);
    }
}

// fonction qui retire un like ou dislike
const removeLikeDislike = (sauce, prop, el) => {
    try {
        sauce[prop] = sauce[prop].filter(item => item !== el);
        computeLikeDislike(sauce);
        sauce.save();

    } catch (error) {
        console.log(error);
    }
}


// fonction qui détermine si un element est présent dans un tableau
const isInArray = (arr, el) => {
    return arr.some(item => item === el);
}

