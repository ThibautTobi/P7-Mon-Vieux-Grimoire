const express = require ('express');
const router = express.Router();

/************* renvoie un tableu des trois livres qui ont la meilleure note moyenne  **************/
router.get('/api/books/besrating', (req, res ,next) =>{
    try {
       //console.log(req.body);
        res.status(201).json({
          message: 'voici les trois meilleur livres'
        }); 
    } catch (error) {
        
    };

    next();
  });
  

  module.exports = router;