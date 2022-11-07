const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const mailVerif = require('../middleware/mail-verif');

router.post('/signup', mailVerif, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;