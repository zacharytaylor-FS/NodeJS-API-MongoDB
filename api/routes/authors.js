const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Author = require("../model/author");
const Messages = require("../../messages/messages");

router.get("/", (req, res, next) => {
	Author.find({})
		.exec()
		.then((author) => {
			res.status(200).json({
				message: "GET all Author(s)",
				author: author,
				name: author.name,
			});
		})
		.catch();
});

router.post("/", (req, res, next) => {
	const newAuthor = new Author({
		_id: new mongoose.Types.ObjectId(),
		email: req.body.email,
		name: req.body.name,
		bio: req.body.bio,
		phone: req.body.phone,
		cell: req.body.cell,
	});

	newAuthor
		.save()
		.then((author) => {
			console.log(author);
			res.status(201).json({
				message: "Author Saved",
				author: {
					id: author._id,
					email: author.email,
					name: author.name,
					bio: author.bio,
					phone: author.phone,
					cell: author.cell,
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

router.get("/:authorId", (req, res, next) => {
	const authorId = req.params.authorId;

	Author.findById(authorId)
		.select("name _id")
		.populate("book", "title author") //? Allow you to bring in another collection
		.exec() //? RETURN PROMISE
		.then((author) => {
			if (!author){
				console.log(author);
				return res.status(404).json({
					message: Messages.author_not_found, //* Messages 
				});
			}

			res.status(201).json({
				author: author,
				name: author.name
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: {
					message: err.message,
				},
			});
		});
});

router.patch("/:authorId", (req, res, next) => {
	const authorId = req.params.authorId;
	const name = req.body.name
	const updatedAuthor = {
		email: req.body.email,
		name: req.body.firstName,
		bio: req.body.bio,
		phone: req.body.phone,
		cell: req.body.cell,
	};

	Author.updateOne(
		{
			_id: authorId,
		},
		{
			$set: updatedAuthor,
		}
	)
		.exec() //? RETURN PROMISE
		.then((result) => {
			console.log(result);
			res.status(200).json({
				message: "Updated Author",
				author: {
					result
					// id: result._id,
					// email: result.email,
					// first: result.firstName,
					// last: result.lastName,
					// bio: result.bio,
					// home: result.phone,
					// cell: result.cell,
				},
				metadata: {
					host: req.hostname,
					status: req.status,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
});

/** DELETE Author By Id
 * ? ? ?
 * Delete author by
 * @param {Number} authorId req.param.authorId
 */

router.delete("/:authorId", (req, res, next) => {
	const authorId = req.params.authorId;

	Author.deleteOne({
		_id: authorId,
	})
		.exec() //? RETURN PROMISE
		.then((result) => {
			console.log(result);
			res.status(200).json({
				message: "Author Deleted",
				request: {
					method: "GET",
					url: "http://localhost:3001/authors/" + authorId,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
});

module.exports = router;
