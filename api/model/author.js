"use strict";
const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book", //* Reference Book Model
		// required: true,
	}
});

module.exports = mongoose.model("Author", authorSchema, null, {});
