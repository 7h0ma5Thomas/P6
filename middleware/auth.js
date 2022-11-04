const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // On extrait le token du header "authorization", split permet de tout récupérer apres l'espace dans le header
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // verify = décode le token
        const userId = decodedToken.userId; 
        req.auth = { // on extrait l'id utilisateur
            userId: userId
        };
    next();    
    }catch(error){
        res.status(401).json({ error });
    }
};