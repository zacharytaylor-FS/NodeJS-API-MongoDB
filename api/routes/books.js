const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Books - GET'
  });
});

router.post('/', (req, res, next) => {
  
  const newBook = new Book({
    _id: Mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author
  });

  newBook.save().then().catch();
  
  res.json({
    message: 'Books - POST'
  });
});

router.get('/:bookid', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - GET',
    bookId: bookId,
  });
});

router.patch('/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - PATCH',
    bookId: bookId,
  });
});

router.delete('/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - DELETE',
    id: bookId,
  });
});

module.exports = router;