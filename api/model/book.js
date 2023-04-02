const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
	title: {type: String,required: true},
	author: {type: String,required: true},
  age: {type: Number, default: 0},
	description: {type: String,required: true},
  updated: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Book", bookSchema);
