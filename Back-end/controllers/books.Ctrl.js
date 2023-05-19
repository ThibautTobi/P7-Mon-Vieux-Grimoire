
const bookShema = require('../models/books.model');
const fs = require('fs');
const path = require('path');
//import module sharp pour redimensionner les images
const sharp = require('sharp');

/*********** renvoie un tableau de tous les livres de la base de donnés *********/
exports.allBooks = (req, res ,next) => {                                
    bookShema.find()
      .then(books => res.status(200).json(books) )
      .catch(error => res.status(404).json({ error }));
};                                                             

/************* ajout d'un nouveau livre  a la basse de donnés  **************/
exports.addBook = async (req, res ,next) => {  
 
    const bookObject = JSON.parse(req.body.book); // .book
    delete bookObject._id;
    delete bookObject._userId;

    // Chemin de destination de l'image redimensionnée
    const resizedImagePath = `images/resized_${req.file.filename}`;

        try {
        // Redimensionner l'image en utilisant sharp
        await sharp(req.file.path)
        .resize(537,405) // Définir la largeur et hauteur
        .toFile(resizedImagePath);

        // Supprimer l'image d'origine non redimensionnée
        fs.unlinkSync(req.file.path);

        const book = new bookShema({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/${resizedImagePath}`
        });
          await book.save()
          res.status(201).json({message: 'Objet enregistré !'});

        } catch (error) {
            fs.unlinkSync(resizedImagePath);
            res.status(400).json( { error });
        }
};

/************* renvoie le livre sélectionné grace a sont id  **************/
exports.getOneBook = (req, res) => {                                            
    bookShema.findOne({ _id: req.params.id})
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
};

/************* modification d'un livre  **************/
exports.modifyBook = (req, res, next) => { 
//         const bookId = req.params.id;
//         const bookObject = req.file
//           ? {
//               ...JSON.parse(req.body.book),
//               imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`
//             }
//           : { ...req.body };
      
//         //  Si un fichier est téléchargé, supprimer l'ancienne image
//         if (req.file) {
//           bookShema.findOne({ _id: bookId })
//             .then((book) => {
//               // Si une image existante est trouvée, supprimez-la
//               if (book.imageUrl) {
//                 const filename = book.imageUrl.split('/images/resized_')[1];
//                 fs.unlink(`images/resized_${filename}`, (error) => {
//                   if (error) {
//                     console.error(`Erreur lors de la suppression de l'ancienne image :`, error);
//                   }
//                 });
//               }
//             })
//             .catch((error) => {
//               console.error(`Erreur lors de la suppression de l'ancienne image :`, error);
//             });
//         }
      
//         // Suppression du champ _userId pour des raisons de sécurité (éviter l'usurpation)
//         delete bookObject._userId;
      
//         bookShema.findOne({ _id: bookId })
//           .then((book) => {
//             if (book.userId !== req.auth.userId) {
//               res.status(401).json({ message: 'Non autorisé !' });
//             } else {
//               bookShema.updateOne({ _id: bookId }, { ...bookObject, _id: bookId })
//                 .then(() => {
//                   // Suppression de l'ancienne image après la modification réussie
//                   if (req.file) {
//                     const filename = req.file.filename;
//                     fs.unlink(`images/resized_${filename}`, (error) => {
//                       if (error) {
//                         console.error(`Erreur lors de la suppression de l'ancienne image :`, error);
//                       }
//                     });
//                   }
//                   res.status(200).json({ message: 'Objet modifié !' });
//                 })
//                 .catch((error) => {
//                   // Suppression de la nouvelle image en cas d'erreur de modification
//                   if (req.file) {
//                     fs.unlink(req.file.path, (error) => {
//                       if (error) {
//                         console.error(`Erreur lors de la suppression de la nouvelle image :`, error);
//                       }
//                     });
//                   }
//                   res.status(401).json({ error });
//                 });
//             }
//           })
// };
      ///////////////////////////////////////////
      
  //     const bookId = req.params.id;
  //     const bookObject = req.file
  //   ? {
  //       ...JSON.parse(req.body.book),
  //       imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`
  //     }
  //   : { ...req.body };

  // // Vérification de l'utilisateur et mise à jour du livre
  // bookShema.findOneAndUpdate(
  //   { _id: bookId, userId: req.auth.userId },
  //   { ...bookObject, _id: bookId },
  //   { new: true }
  // )
  //   .then((updatedBook) => {
  //     if (!updatedBook) {
  //       // Livre non trouvé ou utilisateur non autorisé
  //       return res.status(404).json({ message: 'Livre non trouvé ou utilisateur non autorisé !' });
  //     }

  //     // Gestion de l'image
  //     if (req.file) {
  //       const oldImagePath = updatedBook.imageUrl;
  //       const newImagePath = `images/resized_${req.file.filename}`;

  //       updatedBook.imageUrl = `${req.protocol}://${req.get('host')}/${newImagePath}`;

  //       // Déplacement de la nouvelle image vers le dossier "images"
  //       fs.rename(req.file.path, path.join(__dirname, '..', newImagePath));

  //       // Suppression de l'ancienne image
  //       if (oldImagePath) {
  //         fs.unlink(path.join(__dirname, '..', oldImagePath));
  //       }
  //     }

  //     // Sauvegarde du livre mis à jour
  //     updatedBook.save()
  //       .then(() => {
  //         res.status(200).json({ message: 'Objet modifié !' });
  //       })
  //       .catch((error) => {
  //         console.error(`Erreur lors de la sauvegarde du livre :`, error);
  //         res.status(500).json({ error });
  //       });
  //   })
  //   .catch((error) => {
  //     console.error(`Erreur lors de la modification du livre :`, error);
  //     res.status(500).json({ error });
  //   });
      
      
  //     };

//////////////////////////////////// comme sur la video e-geniea tester 

 const bookId = req.params.id;

if (req.file) {

  bookShema
  .findOne({ _id: bookId })
  .then((book) => {

          // // Chemin de destination de l'image redimensionnée
          // const resizedImagePath = `images/resized_${req.file.filename}`;

          // try {
          // // Redimensionner l'image en utilisant sharp
          // sharp(req.file.path)
          // .resize(537,405) // Définir la largeur et hauteur
          // .toFile(resizedImagePath);

    // récupération du non de la photo à supprimer dans la base de donnée
    const filename = book.imageUrl.split('/images/resized_')[1];

    // suppression de l'image dans le dossier images du serveur 
                fs.unlink(`images/resized_${filename}`, (error) => {
                  if (error) { console.error(`Erreur lors de la suppression de l'ancienne image :`, error); }
                  })

  })
  .catch((error)=> res.status(404).json({error}))

}

// objet qui va étre mise à jour dans la base de donnée

// deux cas possible 

        // Suppression du champ _userId pour des raisons de sécurité (éviter l'usurpation)
        // delete bookObject._userId;

          // Chemin de destination de l'image redimensionnée
          const resizedImagePath = `images/resized_${req.file.filename}`;

          // Redimensionner l'image en utilisant sharp
          sharp(req.file.path)
          .resize(537,405) // Définir la largeur et hauteur
          .toFile(resizedImagePath);

const bookObject = req.file
? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${resizedImagePath}`
  }
: { ...req.body };

// mettre a jour la base de donnée
bookShema
.updateOne({ _id: bookId },
  { ...bookObject,
    imageUrl: `${req.protocol}://${req.get('host')}${resizedImagePath}`,
     _id: bookId 
  })
.then(() => res.status(200).json({ message : `l'objet à bien été mise à jour`}))
.catch((error)=> res.status(404).json({error}))
}


////// reprendre de la requette post pour charger au bon format et changer au bon non 

// // Chemin de destination de l'image redimensionnée
// const resizedImagePath = `images/resized_${req.file.filename}`;

// try {
// // Redimensionner l'image en utilisant sharp
//  sharp(req.file.path)
// .resize(537,405) // Définir la largeur et hauteur
// .toFile(resizedImagePath);

// // Supprimer l'image d'origine non redimensionnée
// fs.unlink(req.file.path);

// const book = new bookShema({
//     ...bookObject,
//     userId: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get('host')}/${resizedImagePath}`
// });
//   book.save()
//   res.status(201).json({message: 'Objet enregistré !'});

// } catch (error) {
//     fs.unlinkSync(resizedImagePath);
//     res.status(400).json( { error });
// }



//////////////////////////////////////////////

// const bookId = req.params.id;

// if (req.file) {
//   bookShema
//     .findOne({ _id: bookId })
//     .then((book) => {
//       // Vérification si un livre est trouvé
//       if (!book) {
//         return res.status(404).json({ message: "Livre non trouvé" });
//       }

//       // Récupération du nom de la photo à supprimer dans la base de données
//       const filename = book.imageUrl.split('/images/resized_')[1];

//       // Suppression de l'image dans le dossier "images" du serveur
//       fs.unlink(`images/resized_${filename}`, (error) => {
//         if (error) {
//           console.error(`Erreur lors de la suppression de l'ancienne image :`, error);
//           // En cas d'erreur lors de la suppression de l'image, vous pouvez choisir de continuer
//           // la mise à jour du livre ou de renvoyer une réponse d'erreur appropriée.
//         }

//         // Objet qui va être mis à jour dans la base de données
//         const bookObject = {
//           ...JSON.parse(req.body.book),
//           imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`
//         };

//         // Mise à jour de la base de données avec le nouvel objet de livre
//         bookShema
//           .updateOne({ _id: bookId }, { ...bookObject, _id: bookId })
//           .then(() => res.status(200).json({ message: `L'objet a bien été mis à jour` }))
//           .catch((error) => res.status(500).json({ error }));
//       });
//     })
//     .catch((error) => res.status(500).json({ error }));
// } else {
//   // Si aucun fichier n'est téléchargé, effectuez simplement la mise à jour sans suppression d'image
//   const bookObject = req.body;

//   // Mise à jour de la base de données avec le nouvel objet de livre
//   bookShema
//     .updateOne({ _id: bookId }, { ...bookObject, _id: bookId })
//     .then(() => res.status(200).json({ message: `L'objet a bien été mis à jour` }))
//     .catch((error) => res.status(500).json({ error }));
// }
// };

/************* suppression d'un livre  **************/
exports.deleteBook = (req, res, next) => {
  // recherche le livre par les parametre dans l'url (id)  
  bookShema.findOne({ _id: req.params.id}) 
    .then(book => {
        //compare userId de la base de donné a celle de la req
        if (book.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            //j'extrait le non de l'image dans la base de donnée et  je la supprime dans le back end 
            const filename = book.imageUrl.split('/images/resized_')[1];
            fs.unlink(`images/resized_${filename}`, () => {
                // je supprime le livre de la base de donnée
                bookShema.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error })); /////////// 400 ?
            });
        }
    })
    .catch( error => {
        res.status(404).json({ error });
    });
};

/************* ajout du rating  **************/
exports.addRatingBook = (req, res ,next) => {

    const bookId = req.params.id;
    const  userId  = req.auth.userId;
    const  rating  = req.body.rating;

    // recherche le livre part l'id
    bookShema.findById(bookId)
        .then(book => {
        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
            // on ajoute au tableau ratings dans le schema du livre conserné
            book.ratings.push({ userId, grade: rating });

            // Calcul du nouvel Rating
            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = sumRatings / totalRatings;

            book.save()
                    .then(() => 
                        res.status(201).json({ message: `ajout du rating !`})),
                        // res.redirect("/api/books/")
                        window.location.reload()
                    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

/************* renvoie un tableu des trois livres qui ont la meilleure note moyenne  **************/
exports.bestRating = (req, res, next) => {
    bookShema.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then(books => {
            res.status(200).json( books );
          })
        .catch(error => {
            res.status(500).json({ error });
        });  
};