"use strict";
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Book", bookSchema);
