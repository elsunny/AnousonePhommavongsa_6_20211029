const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/user');

// route vers la page signup
router.post('/signup', controllerUser.signup);

// route vers la page login
router.post('/login', controllerUser.login);

module.exports = router;