const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  author: String,
});

module.exports = mongoose.model('Book', bookSchema)