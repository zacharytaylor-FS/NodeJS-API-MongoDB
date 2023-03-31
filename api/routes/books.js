"use strict";
const express = require("express");
const mongoose = require("mongoose");
const Messages = require("../../messages/message")
const router = express.Router();
const Book = require("../model/book");

//* GET BOOKS
router.get("/", (req, res, next) => {

	Book.find({})
		.then((result) => {
			res.status(200).json({
				message: "Get ALL Book(s)",
				result,
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

/** CREATE BOOK
 * ? Advance Features
 * * Validation
 * ToDo title: {type: String, required: true}
 *
 * *
 * @param { Object } newBook return Instance of Book{}
 *
 * */
router.post("/", (req, res, next) => {
	//* Check to see if Book exist
	Book.find({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description
	})
		.exec() //* Makes TRUE Promise
		.then((result) => {
			console.log(result);
			// IF book exit
			if (result.length > 0) {
				return res.status(406).json({
					message: "Book is already cataloged",
				});
			}

			/** Create Book
			 *
			 * @const { Object } newBook return Instance of Book{}
			 */
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
router.get("/:bookId", (req, res, next) => {
	const bookId = req.params.bookId;

	Book.findById(bookId)
		.then((book) => {
			if (!book) {
				console.log(book);
				return res.status(404).json({
					message: Messages.book_not_found
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

//* PATCH/PUT BY ID
router.patch("/update/:bookId", (req, res, next) => {
	const bookId = req.params.bookId;

	//* Create payload
	const updatedBook = {
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
	};
	// Book.updateOne({filter:value},{$set:payload})
	Book.updateOne(
		{
			_id: bookId,
		},
		{
			$set: updatedBook,
		}
	)
		.then((result) => {
			res.status(200).json({
				message: "Updated Book",
				book:{
					  id: result._id,
						title: result.title,
						author: result.author,
						description: result.description,
					},
        metadata:{
            host: req.hostname,
            method: req.method
        }
      })
		})
		.catch((err) => {
			res.status(500).json({
				error: {
					message: err.message,
				},
			});
		});
});

router.delete("/:bookId", (req, res, next) => {
	const bookId = req.params.bookId;

	Book.findByIdAndDelete(bookId)
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
			console.log(err);
			res.status(500).json({
				error: {
					message: err.message,
					status: err.status,
				},
			});
		});
});

module.exports = router;
