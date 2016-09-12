const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('authors', {
		list: [
			{
				'link': '/books',
				'text': 'Books'
			},
			{
				'link': '/authors',
				'text': 'Authors'
			}
		]
	});
});

module.exports = router;