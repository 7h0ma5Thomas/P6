const mongoose = require('mongoose');

// On créé le schema de données dont on a besoin
// l'élément _id sera généré automatiquement par MongoDB 
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

// Méthode pour exporté le schéma en modèle Mongoose "thing"
// on le rend ainsi disponible pour notre application Express 
// pour lire et enregistrer dans la base de données
module.exports = mongoose.model('Sauce', sauceSchema);