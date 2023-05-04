const express = require ('express');
const router = express.Router();

/************* ajout du rating  **************/
router.post('/api/books/:id/rating', (req, res ,next) =>{
    console.log(req.body);
    res.status(201).json({
      message: 'ajout du vote du rating réussi'
    });
    next();
  });

module.exports = router;