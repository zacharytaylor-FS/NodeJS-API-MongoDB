"use strict";
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../model/book");

//* GET BOOKS
router.get("/", (req, res, next) => {
	Book.find({})
		.then((result) => {
			res.status(200).json({
				message: "Get ALL Book(s)",
				book: result,
				// 	title: result.title,
				// 	author: result.author,
				// 	id: result._id,
				// },
				metadata: {
					host: req.hostname,
					method: req.method,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: {
					message: err.message,
					status: err.status,
				},
			});
		});
});

//* Create Book
router.post("/", (req, res, next) => {
	Book.find({
		title: req.body.title,
		author: req.body.author,
	})
		.exec() //* Makes TRUE Promise
		.then((result) => {
			console.log(result);
			if (result.length > 0) {
				return res.status(406).json({
					message: "Book is already cataloged",
				});
			}

			const newBook = new Book({
				_id: new mongoose.Types.ObjectId(),
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
			});

			//* Write to the db.library
			newBook
				.save()
				.then((result) => {
					console.log(result);
					res.status(200).json({
						message: "Book Saved",
						book: {
							id: result._id,
							author: result.author,
							title: result.title,
							description: result.description,
							metadata: {
								method: req.method,
								host: req.hostname,
							},
						},
					});
				})
				.catch((err) => {
					res.status(500).json({
						error: {
							message: err.message,
							status: err.status,
						},
					});
				});
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json({
				error: "Unable to save book with title:" + req.body.title,
			});
		});
});

//* GET BY ID
router.get("/:bookid", (req, res, next) => {
	const bookId = req.params.bookId;

	Book.findById(bookId)
		.then((book) => {
			if (!book) {
				console.log(book);
				return res.status(404).json({
					message: "Book Not Found",
				});
			}

			res.status(201).json({
				message: "Get Book By ID",
				book: {
					id: book._id,
					title: book.title,
					author: book.author,
					description: book.description,
				},
				metadata: {
					host: req.hostname,
					status: req.status,
				},
			});
		})
		.catch((err) => {
			console.log(err.message);
			res.status(500).json({
				error: {
					message: err.message,
					status: err.status,
				},
			});
		});
});

router.patch("/update/:bookId", (req, res, next) => {
	const bookId = req.params.bookId;
	res.json({
		message: "Books - PATCH",
		id: bookId,
	});
});

router.delete("/:bookId", (req, res, next) => {
	const bookId = req.params.bookId;

	Book.findByIdAndDelete({ _id: bookId }, { $set: deleteBook })
		.then((result) => {
			res.status(200).json({
				message: "Books - DELETE",
				book: {
					title: result.title,
					author: result.author,
					id: result._id,
				},
				metadata: {
					host: req.hostname,
					method: req.method,
				},
			});
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json({
				error: {
					message: err.message,
					status: err.status,
				},
			});
		});
});

module.exports = router;
