const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Author = require("../model/author");
const Messages = require("../../messages/message");

router.get("/", (req, res, next) => {
	
	Author.find({})
		.exec()
		.then((author) => {
			res.status(200).json({
				message: "GET all Author(s)",
				author: author,
				name: author.name,
				metadata: {
					host: req.hostname,
					method: req.method
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: {
					message: err.message,
					status: err.status
				}
			})
		});
});

router.post("/", (req, res, next) => {
	const newAuthor = new Author({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		bio: req.body.bio,
		
	});

	newAuthor
		.save()
		.then((author) => {
			console.log(author);
			res.status(201).json({
				message: "Author Saved",
				author: {
					id: author._id,
					name: author.name,
					email: author.email,
					bio: author.bio,
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

//? Get By Id
router.get("/:authorId", (req, res, next) => {
	const authorId = req.params.authorId;

	Author.findById(authorId)
	.select("name _id")
	.exec()
	.then(author => {
		console.log(author);
		res.status(201).json({
			author: author
		})
	})
	.catch(err => {
		res.status(500).json({
			error: {
				message: err.message
			}
		})
	})
});

//? PATCH/UPDATE By Id
//* Model.upateOne().exec().then().catch()
router.patch("/:authorId", (req, res, next) => {
	const authorId = req.params.authorId;

	//* Create Payload
	const updatedAuthor = {
		name: req.body.name,
		email: req.body.email,
		bio: req.body.bio,
	};

	Author.updateOne(
		{
			_id: authorId,
		},
		{
			$set: updatedAuthor, //* $set Payload
		}
	)
		.exec() //? RETURN PROMISE
		.then((result) => {
			console.log(result);
			res.status(200).json({
				message: "Updated Author",
				result,
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
