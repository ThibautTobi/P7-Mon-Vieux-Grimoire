import { books } from "./dataBooks";
const express = require ('express');
const router = express.router();

router.route('/books')
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