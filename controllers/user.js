const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //hash pour crypter le mdp, 10 (salt) correspond au nombre d'execution de l'algorytme de Hashage en nbr de tour
    .then(hash => { // on créé un nouvel utilisateur avec le mdp crypté et son mail
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: "L'utilisateur a bien été créé !" }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); // 500 = erreur serveur
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ message: " L'utilisateur n'a pas été trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password) // fonction compare permet de comparer le mdp saisi avec le hash de la base de données
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrecte !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( // fonction sign = permet de chiffrer un nouveau token
                        { userId: user._id }, // identifiant utilisateur (payload)
                        'RANDOM_TOKEN_SECRET', // clé secrete pour l'encodage (+ longue et aléatoire pour la production)
                        { expiresIn: '24h' } // configuration : expiration du token au bout de 24h
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
