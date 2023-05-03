const express = require ('express');
const mongoose = require('mongoose');
//const routerBooks = require ('./books');
//const path = require ('path');
//import { books } from "./dataBooks";
const app = express();

/*********** connection mongo db ***********/
mongoose.connect('mongodb+srv://thibautdenis0:<password>@openclassroom.gnujvda.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/** intercept tout en format json ce qui nous donne le json dans req.body **/
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/**************** renvoie un tableau de tous les livres de la base de donnés **************/
app.get('/api/books', (req, res, next)=>{

  const data = 
  [
    {
    "id": "1",
    "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
    "title" : "Milwaukee Mission",
    "author": "Elder Cooper",
    "imageUrl" : "https://via.placeholder.com/206x260",
    "year" : 2021,
    "genre" : "Policier",
    "ratings" : [{
      "userId" : "1",
      "grade": 5
    },
      {
        "userId" : "1",
        "grade": 5
      },
      {
        "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
        "grade": 5
      },
      {
        "userId" : "1",
        "grade": 5
      }],
    "averageRating": 3
  },
    {
      "id": "2",
      "userId" : "clbxs3tag6jkr0biul4trzbrv",
      "title" : "Book for Esther",
      "author": "Alabaster",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Paysage",
      "ratings" : [{
        "userId" : "clbxs3tag6jkr0biul4trzbrv",
        "grade": 4
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 4.2
    },
    {
      "id": "3",
      "userId" : "1",
      "title" : "The Kinfolk Table",
      "author": "Nathan Williams",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Cuisine",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 3
    }
  ];

    // res.json(books);
    // res.status(200);
  console.log("test fait");

  
    res.status(200).json(data);

});
/***************************************** authentification utilisateur *************************************/

/************* ajout utilisateur a la base de donnés et hachage du mot de pass(crypto)  **************/
app.post('/api/auth/signup', (req, res ,next) =>{

  console.log(req.body);
  res.status(201).json({
    message: 'création nouvel utilisateur'
  });
  next();
});

/************* identification et verification utilisateur , renvoi id utilisateur et un token web json  contenant id utilisateur **************/
app.post('/api/auth/login', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'connexion  utilisateur'
  });
  next();
});

/***************************************** donnés books ********************************************/

/************* renvoie le livre sélectionné grace a sont id  **************/
app.get('/api/books/:id', (req, res ,next) =>{
  console.log(req.body);
  //res.send('book' + req.params.id);
  res.status(201).json({
    message: 'le livre choisi'
  });
  next();
});

/************* renvoie un tableu des trois livres qui ont la meilleure note moyenne  **************/
app.get('/api/books/besrating', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'voici les trois meilleur livres'
  });
  next();
});

/************* ajout d'un nouveau livre  a la basse de donnés  **************/
app.post('/api/books', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: `création d'un nouveau livre a réussi`
  });
  next();
});

/************* modification d'un livre  **************/
app.put('/api/books/:id', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'la modification a réussi'
  });
  next();
});

/************* suppression d'un livre  **************/
app.delete('/api/book/:id', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'la suppression a réussi'
  });
  next();
});

/************* ajout du rating  **************/
app.post('/api/books/:id/rating', (req, res ,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'ajout du vote du rating réussi'
  });
  next();
});


module.exports = app;









/*
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});
*/

/** 
const bodyUser =
{
email : String - adresse e-mail de l’utilisateur [unique]
password : String - mot de passe haché de l’utilisateur
}

const bodyBook =
{
userId : String - identifiant MongoDB unique de l'utilisateur qui a créé le livre
title : String - titre du livre
author : String - auteur du livre
imageUrl : String - illustration/couverture du livre
year: Number - année de publication du livre
genre: String - genre du livre
ratings : [
{
userId : String - identifiant MongoDB unique de l'utilisateur qui a noté le livre
grade : Number - note donnée à un livre
}
] - notes données à un livre
averageRating : Number - note moyenne du livre
}
 */