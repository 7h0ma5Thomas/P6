const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Votre mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule,au moins 1 chiffre et aucun caractère spécial' });
    }else{
        next();
    }
};