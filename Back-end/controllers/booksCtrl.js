/**** import du shema des livre pour la base de donnée ****/
const bookShema = require('../models/books');

/*********** renvoie un tableau de tous les livres de la base de donnés *********/
exports.allBooks = ((req, res ,next) => {
    bookShema.find()
      .then(books => res.status(200).json(books) )
      .catch(error => res.status(404).json({ error }));

  //  next();
});

/************* ajout d'un nouveau livre  a la basse de donnés  **************/
exports.addBook = ((req, res ,next) => {
/**** suppression de l'id créé par le fron end si besoin ****/
    //delete req.body._id;
    // a voir dans le front-end

    /**  demande authentification sinon pas possible **/
  const books = new bookShema ({ ...req.body });
      books.save()
        .then(() => res.status(201).json({ message: `création d'un nouveau livre a réussi !`}))
        .catch(error => res.status(400).json({ error }));

  //  next();  est ce que je dois mettre le next pour que sa passe a la suite.
});

/************* renvoie le livre sélectionné grace a sont id  **************/
exports.getOneBook =(req, res) => {

    bookShema.findOne({ _id: req.params.id})
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
  };


/************* modification d'un livre  **************/
exports.modifyBook = (req, res, next) => {
    
    /**  demande authentification sinon pas possible **/
    bookShema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };


/************* suppression d'un livre  **************/
exports.deleteBook = (req, res, next) => {

    /**  demande authentification sinon pas possible **/
    bookShema.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };

/************* ajout du rating  **************/
exports.addRatingBook = (req, res ,next) => {

    /**  demande authentification sinon pas possible **/
      const books = new bookShema ({ ...req.body });
      // ajouter que la partie rating en plus au schema !
              books.save()
                .then(() => res.status(201).json({ message: `ajout du rating !`}))
                .catch(error => res.status(400).json({ error }));
        
        //next();
};


/************* renvoie un tableu des trois livres qui ont la meilleure note moyenne  **************/
exports.bestRating = (req, res ,next) => {
    
    const books = new bookShema ({ ...req.body });
    // ajouter les trois meilleur rating ! voir methode find
            books.find()
              .then(() => res.status(201).json({ message: `ajout du rating !`}))
              .catch(error => res.status(400).json({ error }));
  
     // next();
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