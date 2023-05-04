const express = require('express');
const router = express.Router();
 
router.route('/api/books/:id')
.get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  })
  .delete(function(req, res) {
    res.send('delete the book');
  });

module.exports = router;

/************* renvoie le livre sélectionné grace a sont id  **************/
// app.get('/api/books/:id', (req, res ,next) =>{
//     console.log(req.body);
//     //res.send('book' + req.params.id);
//     res.status(201).json({
//       message: 'le livre choisi'
//     });
//     next();
//   });
  
  
  /************* modification d'un livre  **************/
//   app.put('/api/books/:id', (req, res ,next) =>{
//     console.log(req.body);
//     res.status(201).json({
//       message: 'la modification a réussi'
//     });
//     next();
//   });
  
  /************* suppression d'un livre  **************/
//   app.delete('/api/book/:id', (req, res ,next) =>{
//     console.log(req.body);
//     res.status(201).json({
//       message: 'la suppression a réussi'
//     });
//     next();
//   });