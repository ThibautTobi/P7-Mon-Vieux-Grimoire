const express = require('express');
const router = express.Router();

/************* ajout utilisateur a la base de donnés et hachage du mot de pass(crypto)  **************/
router.post('/api/auth/signup', (req, res ,next) =>{

    try {
        console.log(req.body);
        res.status(201).json({
        message: 'création nouvel utilisateur'
        });
    } catch (error) {
        
    }

    next();
  });

  module.exports = router;