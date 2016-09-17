const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb').MongoClient;
const passport = require('passport');

const routes = () => {
	router.route('/signUp')
		.post((req, res, next) => {
			const url = 'mongodb://localhost:27017/libraryApp';

			mongoDB.connect(url, (err, db) => {
				const collection = db.collection('users');
				const user = { username: req.body.userName, password: req.body.password };

				collection.insert(user, (err, result) => {
					req.login(result, () => {
						res.redirect('/auth/profile');
					});
				});
			});
		});

	router.route('/signIn')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), (req, res, next) => {
			res.redirect('/auth/profile');
		});

	router.route('/profile')
		.all((req, res, next) => {
			if ( !req.user ) {
				res.redirect('/');
			}
			next();
		})
		.get((req, res) => {
			res.json(req.user);
		});

	router.route('/signIn');

	return router;
};

module.exports = routes;