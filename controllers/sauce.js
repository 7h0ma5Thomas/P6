const Sauce = require('../models/Sauce');
// file system = donne accès aux fonctions qui permettent de modifier le systeme de fichiers
const fs = require('fs');
const { error } = require('console');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); 
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      // req.protocol = on obtien le 1er segment de l'url (http), host = 'localhost:3000', req.file.name = nom du fichier
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
      likes: 0,
      dislikes: 0,
      usersLiked: [' '],
      usersDisliked: [' '],
    });

    sauce.save()
      .then(() => { res.status(201).json({ message: 'Nouvelle sauce ajoutée !'})})
      .catch(error => { res.status(400).json({ error })})
};

exports.modifyingSauce = (req, res, next) => {
    // opérateur ternaire pour regarder si req.file existe
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      // si oui on traite l'image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
      // si non on traite l'objet entrant
    } : { ...req.body }; 

    // Si on a déjà une image uploadée
    if(req.file){
      Sauce.findOne({ _id: req.params.id})
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        // "unlink" permet de supprimer le fichier
        fs.unlink(`images/${filename}`, () => { 
          Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
          .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => {
        res.status(500).json({ error })
      });

    // Sinon dans le cas ou il n'y a pas d'image
    }else{
      Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
      .catch(error => res.status(400).json({ error }));
    }
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé'});
      }else{
        const filename = sauce.imageUrl.split('/images/')[1];
        // "unlink" permet de supprimer le fichier
        fs.unlink(`images/${filename}`, () => { 
          Sauce.deleteOne({ _id: req.params.id})
            .then(() => { res.status(200).json({ message: 'Sauce supprimée !' })})
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    }) 
  };

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };

exports.likeOrDislikeSauce = (req, res, next) => {
  const like = req.body.like
  const userId = req.body.userId
  const sauceId = req.params.id

  switch (like) {
    case 1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
        .then(() => res.status(200).json({ message: "J'aime"}))
        .catch((error) => res.status(400).json({ error }));

    break;

    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
              .then(() => res.status(200).json({ message: 'Sans avis' }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
              .then(() => res.status(200).json({ message: 'Sans avis' }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));

    break;

    case -1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
      .then(() => res.status(200).json({ message: "Je n'aime pas" }))
      .catch((error) => res.status(400).json({ error }));

    break;

    default:
      console.log(error);
  }
}