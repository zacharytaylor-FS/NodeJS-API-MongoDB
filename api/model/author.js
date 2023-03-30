"use strict";
const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book", //* Reference Book Model
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Author", authorSchema, null, {});
