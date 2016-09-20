const express = require('express');
const router = express.Router();
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
const bookSvc = require('../services/goodReadSvc')();

const routes = (list) => {

	const bookCtrl = require('../controllers/book')(bookSvc, list);

	// router.use(bookCtrl.middleware);

	router
		.route('/')
		.get(bookCtrl.getIndex);

	router.route('/:id')
		.get(bookCtrl.getById);

	return router;
};

module.exports = routes;