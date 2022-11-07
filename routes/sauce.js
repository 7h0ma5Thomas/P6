const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);
// ":" indique à Express que la partie de la route qui suit 
// est dynamique (id) et que l'on va chercher l'id de l'objet
router.put('/:id', auth, multer, sauceCtrl.modifyingSauce); 
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce)

module.exports = router;