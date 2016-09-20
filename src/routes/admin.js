const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb').MongoClient;

const books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false,
		bookId: 656
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false,
		bookId: 24280
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false,
		bookId: 656

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


const routes = () => {
	router.route('/addBooks')
		.get((req, res, next) => {
			const url = 'mongodb://localhost:27017/libraryApp';

			mongoDB.connect(url, (err, db) => {
				const collection = db.collection('books');
				collection.insertMany(books, (err, result) => {
					res.send(result);
				});
				db.close();
			});
		});

	return router;
};

module.exports = routes;