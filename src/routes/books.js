const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame',
		read: false
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

const routes = (list) => {

	router.use((req, res, next) => {
		if (!req.user) {
			return res.redirect('/');
		}
		next();
	});

	router
		.route('/')
		.get((req, res, next) => {
			const url = 'mongodb://localhost:27017/libraryApp';

			mongoDB.connect(url, (err, db) => {
				const collection = db.collection('books');
				collection.find({}).toArray((err, books) => {
					res.render('books', {
						list,
						books
					});
				});
			});
		});

	router.route('/:id')
		.get((req, res, next) => {
			const url = 'mongodb://localhost:27017/libraryApp';

			mongoDB.connect(url, (err, db) => {
				const collection = db.collection('books');
				const id = new ObjectID(req.params.id);

				collection.findOne({_id: id}, (err, book) => {
					res.render('book', {
						list,
						book
					});
				});
			});
		});

	return router;
};

module.exports = routes;