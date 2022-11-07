const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

// On crée un modèle avec des règles : 8 caractères minimum et 40 caractères maximum,
// une majuscule et une minuscule, un chiffre, pas d'espace et pas de caractères spéciaux
passwordSchema
    .is().min(8) 
    .is().max(40)
    .has().uppercase()                              
    .has().lowercase()                             
    .has().digits()                                
    .has().not().spaces()
    .is().not().symbols()  

module.exports = passwordSchema;