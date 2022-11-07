const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// L'utilisation de ce plugin oblige un utilisateur à n'avoir
// qu'un seul mail pour créer un compte ou s'y connecter
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);