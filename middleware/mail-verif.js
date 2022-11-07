module.exports = (req, res, next) => {
    const mailValid = (email) => {
        let mailReg = /[\wàéèâêäëçù]+@([\wàéèâêäëçù]+\.)+[a-zA-Z]{2,}/m
        let regexOk = mailReg.test(email) 
        regexOk ? next() : res.status(400).json({ message: 'Adresse mail non valide' });
    }
    mailValid(req.body.email)
};