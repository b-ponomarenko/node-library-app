const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handelbars = require('express-handlebars');

const passportConfig = require('./src/config/passport');

const app = express();
const port = process.env.PORT || 5000;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'libraryApp', resave: true, saveUninitialized: true }));

passportConfig(app);


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
const authRoutes = require('./src/routes/auth')(nav);

app.set('views', './src/views');

app.engine('.hbs', handelbars({extname: '.hbs'}));

app.set('view engine', '.hbs');

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.get('/', function (req, res) {
    res.render('index', {title: 'Hello from render',
			list: nav});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});