const mongoDB = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const bookCtrl = (bookService, list) => {
  const getIndex = (req, res, next) => {
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
  };

  const getById = (req, res, next) => {
    const url = 'mongodb://localhost:27017/libraryApp';

    mongoDB.connect(url, (err, db) => {
      const collection = db.collection('books');
      const id = new ObjectID(req.params.id);

      collection.findOne({_id: id}, (err, book) => {
        if ( book.bookId ) {
          bookService.getBookById(book.bookId, (err, book) => {
            res.render('book', {
              list,
              book
            });
          });
        } else {
          res.redirect('/');
        }
      });
    });
  };

  const middleware = (req, res, next) => {
    if (!req.user) {
      return res.redirect('/');
    }
    next();
  };

  return {
    getIndex,
    getById,
    middleware
  }
};

module.exports = bookCtrl;