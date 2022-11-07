const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // On extrait le token du header "authorization", split permet de tout récupérer apres l'espace dans le header
        const token = req.headers.authorization.split(' ')[1]; 
        // "verify" permet de décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
        const userId = decodedToken.userId;
        // On extrait l'id utilisateur 
        req.auth = { 
            userId: userId
        };
    next();    
    }catch(error){
        res.status(401).json({ error });
    }
};