/**** import du shema des livre pour la base de donnée ****/
const books = require('../models/books');
const bookShema = require('../models/books');
const fs = require('fs');

/*********** renvoie un tableau de tous les livres de la base de donnés *********/
exports.allBooks = (req, res ,next) => { 
    bookShema.find()
      .then(books => res.status(200).json(books) )
      .catch(error => res.status(404).json({ error }));
};                                                             

/************* ajout d'un nouveau livre  a la basse de donnés  **************/
exports.addBook = (req, res ,next) => {
        const bookObject = JSON.parse(req.body.Books);
        delete bookObject._id;
        delete bookObject._userId;
        const book = new bookShema({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
          book.save()
          .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
          .catch(error => { res.status(400).json( { error })})
};

/************* renvoie le livre sélectionné grace a sont id  **************/
exports.getOneBook = (req, res) => {

    bookShema.findOne({ _id: req.params.id})
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
};

/************* modification d'un livre  **************/
exports.modifyBook = (req, res, next) => {
    
  const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
// supression userId securiter cas d'usurpation
  delete bookObject._userId;
  bookShema.findOne({_id: req.params.id})
      .then((book) => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorisé !'});
          } else {
              Books.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié !'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => 
          { res.status(400).json({ error });
      });
};

/************* suppression d'un livre  **************/
exports.deleteBook = (req, res, next) => {
  bookShema.findOne({ _id: req.params.id}) 
    .then(book => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                bookShema.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

/************* ajout du rating  **************/
exports.addRatingBook = (req, res ,next) => {
//////////////////////////////////////////////////////////////////   a tester   ////////////////////////////////////////////////////////////////////////////////////////////////
    const bookId = req.params.id;
    const ratingValue = req.body.rating;

    bookShema.findById(bookId)
        .then(book => {
        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
            book.ratings.push(ratingValue);

            bookShema.save()
                    .then(() => res.status(201).json({ message: `ajout du rating !`}))
                    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


/************* renvoie un tableu des trois livres qui ont la meilleure note moyenne  **************/
exports.bestRating = (req, res ,next) => {
    /////////////////////////////////////////////////////////////   a faire    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //const average = req.averageRating ;
    bookShema.find().sort({ averageRating : -1 }).limit(3)
            .then(books => {
                res.status(201).json({ books });
            })
            .catch(error => res.status(400).json({ error }));
};
    

/** test envoie */

// {
//   "userId"          : "clc4wj5lh3gyi0ak4eq4n8syp",
//   "title"           : "toto",
//   "author"          : "tata",
//   "imageUrl"        : "https://via.placeholder.com/206x260",
//   "year"            :   2023,
//   "genre"           :   "cuisine",
//   "ratings"         :   
//       [{
//           "userId"  : "clc4wj5lh3gyi0ak4eq4n8syp",
//           "grade"   : 1
//       }],
//   "averageRating"   : 1
//   }

/**** body envoyer sur postman ****/
// {
//   "userId"          : "clc4wj5lh3gyi0ak4eq4n8sym",
//   "ratings"         :   
//       [{
//           "userId"  : "clc4wj5lh3gyi0ak4eq4n8sym",
//           "grade"   : 3
//       }]
//   }