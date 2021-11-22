const express = require('express')
const router = express.Router()
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer-config');
const controllerSauce = require('../controllers/sauce');




// route permettant l'affichage de l'ensemble des sauces de la bdd
router.get('/', authentification, controllerSauce.getAllSauces);

// route permettant l'enregistrement d'une nouvellle sauce
router.post('/', authentification, multer, controllerSauce.recordSauce);

// route permettant l'affichage d'une sauce spécifique
// ':' signifie que id sera un paramètre
router.get('/:id', authentification, controllerSauce.getASauce);

// route permettant la modification de la sauce
router.put('/:id', authentification, multer, controllerSauce.modifySauce);

// route permettant de supprimer une sauce
router.delete('/:id', authentification, controllerSauce.deleteSauce);

// route pour la gestion des like/dislike
router.post('/:id/like', authentification, controllerSauce.likeSauce);





module.exports = router