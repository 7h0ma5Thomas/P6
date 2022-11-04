const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// constante "storage" , à passer à "multer" comme configuration, qui contient la logique nécessaire 
// pour indiquer à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({  
    destination: (req, file, callback) => { // la fonction "destination" indique à multer d'enregistrer les fichiers dans le dossier images
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype]; // constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
        callback(null, name + Date.now() + '.' + extension); // permet d'ajouter un timestamp Date.now() comme nom de fichier
    }
});

module.exports = multer({ storage: storage }).single('image'); // on exporte multer et on indique que l'on gère uniquement les telechargements de fichiers image