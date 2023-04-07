const mongoose = require("mongoose");
const Book = require('./book')
const { Schema } = mongoose.Schema

const authorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	book: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
		required: true
	}],
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		min: 0
	},
	bio: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Author", authorSchema);
