const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const Book = require('../model/book')

router.get('/', (req, res, next) => {
  res.json({
    message: 'Books - GET'
  });
});

//* Create Book
router.post('/add/:bookId', (req, res, next) => {
  
  Book.find({
    title: req.body.title, 
    author: req.body.author
  })
  .exec()
  .then(result => {
    console.log(result)
    if(result.length > 0){
      return res.status(406).json({
        message: "Book is already cataloged"
      })
    }

  const newBook = new Book({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author
  });

  newBook.save().
    then(result => {
      console.log(result);
      res.status(200).json({
        message: "Book Saved",
        book:{
          title: result.title,
          id: result._id,
          metadata: {
            method: req.method,
            host: req.hostname
          }
        }
      })
    })
    .catch(err => {
      console.error(error);
      res.status(500).json({
        error: {
          message: "Unable to save book with title " + req.body.title
        }
      })
    });

  })
  
});

router.get('/:bookid', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - GET By Id',
    bookId: bookId,

  });
});

router.patch('/update/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - PATCH',
    bookId: bookId,
  });
});

router.delete('/delete/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  res.json({
    message: 'Books - DELETE',
    id: bookId,
  });
});

module.exports = router;