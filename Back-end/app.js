const express = require ('express');

const app = express();

app.use((req, res)=>{
    res.json({message: 'message bien reçu'});
});

module.exports = app;


/** model
 User {
email : String - adresse e-mail de l’utilisateur [unique]
password : String - mot de passe haché de l’utilisateur
}
Book {
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