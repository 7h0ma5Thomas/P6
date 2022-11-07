const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .is().max(40)
    .has().uppercase()                              
    .has().lowercase()                             
    .has().digits()                                
    .has().not().spaces()
    .is().not().symbols()  

module.exports = passwordSchema;