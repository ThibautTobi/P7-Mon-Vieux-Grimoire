const express = require ('express');
const booksCtrl = require('../controllers/booksCtrl');

// ajoute une demande d'authentification avec auth
const auth = require('../middleware/auth');
// gére les fichier images 
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/api/books', booksCtrl.allBooks);
router.post('/api/books', auth, multer, booksCtrl.addBook);
router.get('/api/books/:id', booksCtrl.getOneBook);
router.put('/api/books/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/api/books/:id', auth, booksCtrl.deleteBook);
router.post('/api/books/:id/rating', auth, booksCtrl.addRatingBook);
router.get('/api/books/bestRating', booksCtrl.bestRating);

module.exports = router;