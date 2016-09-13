const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const nav = [
	{
		'link': '/books',
		'text': 'Books'
	},
	{
		'link': '/authors',
		'text': 'Authors'
	}
];
const bookRoutes = require('./src/routes/books')(nav);
const authorRoutes = require('./src/routes/authors');
const adminRoutes = require('./src/routes/admin')(nav);


const handelbars = require('express-handlebars');

app.use(express.static('public'));
app.set('views', './src/views');

app.engine('.hbs', handelbars({extname: '.hbs'}));

app.set('view engine', '.hbs');

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/admin', adminRoutes);

app.get('/', function (req, res) {
    res.render('index', {title: 'Hello from render',
			list: nav});
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});