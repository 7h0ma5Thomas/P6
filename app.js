const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('express-mongo-sanitize');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.DB_SECRET,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(cors());

// Ajout de headers pour permettre d'utiliser l'API sans problème
app.use((req, res, next) => {
    // "*" permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    // Permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
});

app.use(express.json());
app.use(sanitize());
app.use(express.urlencoded({extended: true}));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
// Indique comment traiter les requêtes vers la route /image en rendant le dossier "images" statique
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;