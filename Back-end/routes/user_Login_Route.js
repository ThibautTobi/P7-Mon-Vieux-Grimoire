const express = require('express');
const router = express.Router();

/***************************************** authentification utilisateur *************************************/


/************* identification et verification utilisateur , renvoi id utilisateur et un token web json  contenant id utilisateur **************/
router.post('/api/auth/login', (req, res ,next) =>{
    try {
        console.log(req.body);
        res.status(201).json({
      message: 'connexion  utilisateur'
    });
    } catch (error) {
        
    }
    
    next();
  });

module.exports = router;