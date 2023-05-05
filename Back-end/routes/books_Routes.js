const express = require ('express');
const booksCtrl = require('../controllers/booksCtrl');
// ajoute une demande d'authentification avec auth
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/api/books', booksCtrl.allBooks);
router.post('/api/books', auth, booksCtrl.addBook);
router.get('/api/books/:id', booksCtrl.getOneBook);
router.put('/api/books/:id', auth, booksCtrl.modifyBook);
router.delete('/api/books/:id', auth, booksCtrl.deleteBook);
router.post('/api/books/:id/rating', auth, booksCtrl.addRatingBook);
router.get('/api/books/besrating', booksCtrl.bestRating);

module.exports = router;