const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// La constante "storage" est à passer à "multer" comme configuration qui contient 
// la logique nécessaire pour indiquer à celui-ci où enregistrer les fichiers entrants
const storage = multer.diskStorage({  
    // La fonction "destination" indique à multer d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback) => { 
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // La fonction "filename" indique à multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores
        const name = file.originalname.split(' ').join('_'); 
        // Constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
        const extension = MIME_TYPES[file.mimetype]; 
        // Permet d'ajouter un "timestamp" Date.now() comme nom de fichier
        callback(null, name + Date.now() + '.' + extension); 
    }
});

// On exporte multer et on indique que l'on gère uniquement les telechargements de fichiers "image"
module.exports = multer({ storage: storage }).single('image'); 