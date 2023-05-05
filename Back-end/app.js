const express = require ('express');
const mongoose = require('mongoose');

/**** création d'une couche de securité ****/
require('dotenv').config();

/**** import de mes différentes routes ****/
const books_Routes = require('./routes/books_Routes');
const user_Routes = require('./routes/user_Routes');

const app = express();

/*********** connection mongo db ***********/
mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/** intercepte tout en format json ce qui nous donne le json dans req.body **/
app.use(express.json());

/******* ajout dans le header ******/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/**** dispatch routage *****/
app.use(books_Routes);
app.use(user_Routes);

module.exports = app;