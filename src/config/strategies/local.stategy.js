const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoDB = require('mongodb').MongoClient;

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField: 'userName',
		passwordField: 'password'
	}, (userName, password, done) => {

		const url = 'mongodb://localhost:27017/libraryApp';

		mongoDB.connect(url, (err, db) => {
			const collection = db.collection('users');
			collection.findOne({username: userName}, (err, results) => {
				if ( results.password === password ) {
					const user = results;
					done(null, user);
				} else {
					done(null, false, {
						message: 'Bad password',
					});
				}
			})
		});
	}));
};