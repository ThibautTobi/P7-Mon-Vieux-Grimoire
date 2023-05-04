const express = require ('express');
const router = express.Router();

router.route('/api/books')
/*********** renvoie un tableau de tous les livres de la base de donnés *********/
  .get((req, res ,next) =>{

try {
  //console.log(req.body);
  res.status(201).json({
    message: `renvoi de tous les livres réussi`
  });
} catch (error) {
  console.log(error);
};
    
    next();
  })

/************* ajout d'un nouveau livre  a la basse de donnés  **************/
  .post((req, res ,next) =>{

    try {
      //console.log(req.body);
    res.status(201).json({
      message: `création d'un nouveau livre a réussi`
    });
    } catch (error) {
      
    };
    
    next();
  });


module.exports = router;


//   const data = 
//   [
//     {
//     "id": "1",
//     "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
//     "title" : "Milwaukee Mission",
//     "author": "Elder Cooper",
//     "imageUrl" : "https://via.placeholder.com/206x260",
//     "year" : 2021,
//     "genre" : "Policier",
//     "ratings" : [{
//       "userId" : "1",
//       "grade": 5
//     },
//       {
//         "userId" : "1",
//         "grade": 5
//       },
//       {
//         "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
//         "grade": 5
//       },
//       {
//         "userId" : "1",
//         "grade": 5
//       }],
//     "averageRating": 3
//   },
//     {
//       "id": "2",
//       "userId" : "clbxs3tag6jkr0biul4trzbrv",
//       "title" : "Book for Esther",
//       "author": "Alabaster",
//       "imageUrl" : "https://via.placeholder.com/206x260",
//       "year" : 2022,
//       "genre" : "Paysage",
//       "ratings" : [{
//         "userId" : "clbxs3tag6jkr0biul4trzbrv",
//         "grade": 4
//       },
//         {
//           "userId" : "1",
//           "grade": 5
//         },
//         {
//           "userId" : "1",
//           "grade": 5
//         },
//         {
//           "userId" : "1",
//           "grade": 5
//         }],
//       "averageRating": 4.2
//     },
//     {
//       "id": "3",
//       "userId" : "1",
//       "title" : "The Kinfolk Table",
//       "author": "Nathan Williams",
//       "imageUrl" : "https://via.placeholder.com/206x260",
//       "year" : 2022,
//       "genre" : "Cuisine",
//       "ratings" : [{
//         "userId" : "1",
//         "grade": 5
//       },
//         {
//           "userId" : "1",
//           "grade": 5
//         },
//         {
//           "userId" : "1",
//           "grade": 5
//         },
//         {
//           "userId" : "1",
//           "grade": 5
//         }],
//       "averageRating": 3
//     }
//   ];
