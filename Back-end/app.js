const express = require ('express');
const mongoose = require('mongoose');

/**** création d'une couche de securité ****/
require('dotenv').config();

/**** import de mes différentes routes ****/
const books_Route = require('./routes/books_Route');
const books_Id_Route = require('./routes/books_Id_Route');
const books_Best_Rating_Route = require('./routes/books_Best_Rating_Route');
const books_Id_Rating_Route = require('./routes/books_Id_Rating_Route');
const user_Login_Route = require('./routes/user_Login_Route');
const user_Signup_Route = require('./routes/user_Signup_Route');

const app = express();

/*********** connection mongo db ***********/
mongoose.connect(process.env.DB_URL,
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

/**** dispatch routage *****/
app.use(books_Route);
app.use(books_Id_Route);
app.use(books_Best_Rating_Route);
app.use(books_Id_Rating_Route);
app.use(user_Login_Route);
app.use(user_Signup_Route);

module.exports = app;
